## Context

当前系统状态：
- **Web 前端**：React 19 + Vite + Ant Design（dark theme） + React Router（HashRouter），已有 AppLayout（顶部 Menu + 用户 Dropdown）、HomePage、ProfilePage
- **后端**：Spring Boot 4.0.5 + Spring Security OAuth2 Resource Server（JWT via Keycloak），目前无数据库、无持久层、仅有 `/api/health` 和 `/api/me` 两个端点
- **数据库**：项目规划使用 MariaDB（项目约束中规定 MySQL 8，MariaDB 兼容），当前完全未配置

这是第一个涉及数据持久化的功能，需要同时建立后端持久层基础设施。

## Goals / Non-Goals

**Goals:**

- 在 Web 前端添加「发布事件」菜单和表单页面，支持地图选点标注位置
- 后端新增 `POST /api/issues` 端点，接收事件数据
- 引入 Spring Data JPA + MariaDB，建立持久层基础设施
- 创建 `issue` 实体和数据库表
- 输出建表 SQL 脚本到 `database/create-table.sql`
- 表单提交后显示成功提示

**Non-Goals:**

- 不实现事件列表查看、编辑、删除功能（属于后续 change）
- 不实现事件状态流转（发布/进行中/结束）
- 不实现文件上传（图片/视频）
- 不集成百度地图 SDK——本次使用简单的经纬度输入（文本框）+ 地图预览的方式，地图标注功能后续集成百度地图时完善
- 不实现推送通知

## Decisions

### 1. 地图选点方案

**选择**: 使用 Ant Design 的表单组件实现经纬度输入。本阶段不集成百度地图 SDK，改用 `InputNumber` 输入经度和纬度。后续集成百度地图时再替换为地图标注组件。

**理由**: 百度地图 SDK 集成涉及 API Key 申请、SDK 引入、组件封装等较大工作量，不应与「发布事件」核心功能耦合。先用经纬度输入实现 MVP，确保端到端流程跑通。

**替代方案**: 直接集成百度地图——但这会大幅增加本次 change 的范围和复杂度。

### 2. 后端持久层：Spring Data JPA

**选择**: `spring-boot-starter-data-jpa` + `mariadb-java-client`

**理由**: Spring Data JPA 是 Spring 生态标准 ORM 方案，提供 Repository 抽象，减少模板代码。MariaDB 是项目规划的数据库（兼容 MySQL 8）。

**替代方案**: MyBatis（更灵活的 SQL 控制，但对简单 CRUD 场景 JPA 更简洁）。

### 3. 数据库表设计

**表名**: `issue`

| 列名 | 类型 | 约束 | 说明 |
|---|---|---|---|
| `id` | BIGINT | PK, AUTO_INCREMENT | 主键 |
| `title` | VARCHAR(200) | NOT NULL | 事件名称 |
| `description` | TEXT | NOT NULL | 事件描述 |
| `longitude` | DECIMAL(10,7) | NOT NULL | 经度 |
| `latitude` | DECIMAL(10,7) | NOT NULL | 纬度 |
| `address` | VARCHAR(500) | | 地址描述 |
| `deadline` | DATETIME | NOT NULL | 截止时间 |
| `recruit_count` | INT | | 招募人数 |
| `skill_requirement` | VARCHAR(500) | | 技能要求 |
| `created_by` | VARCHAR(100) | NOT NULL | 创建人（JWT preferred_username） |
| `created_at` | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### 4. API 设计

**端点**: `POST /api/issues`

**请求体**:
```json
{
  "title": "某地猫被困",
  "description": "一只猫被困在树上，需要攀爬救援",
  "longitude": 116.4074,
  "latitude": 39.9042,
  "address": "北京市东城区...",
  "deadline": "2026-04-07T18:00:00",
  "recruitCount": 3,
  "skillRequirement": "绳索攀爬能力"
}
```

**响应**: `201 Created`，返回创建的事件对象（含 `id`、`createdBy`、`createdAt`）。

**认证**: 从 JWT 中提取 `preferred_username` claim 作为 `createdBy`。

### 5. 后端分层架构

```
Controller (IssueController)
  → Service (IssueService)
    → Repository (IssueRepository extends JpaRepository)
      → Entity (Issue)
```

遵循标准 Spring Boot 分层，引入 Service 层为后续业务逻辑扩展预留空间。

### 6. 前端表单

**选择**: Ant Design `Form` 组件 + `Form.Item` 校验规则

**表单字段**:
- 事件名称: `Input`，required
- 事件描述: `Input.TextArea`，required
- 经度: `InputNumber`，required
- 纬度: `InputNumber`，required
- 地址: `Input`，optional
- 截止时间: `DatePicker` (showTime)，required
- 招募人数: `InputNumber`，optional
- 技能要求: `Input.TextArea`，optional

提交后调用 `apiClient.post('/issues', data)`，成功后显示 `message.success()` 并重置表单。

## Risks / Trade-offs

- **数据库连接配置** → `application.properties` 中需配置 MariaDB 连接信息。开发环境假设 MariaDB 运行在 localhost:3306。可通过环境变量覆盖。

- **地图选点降级** → 本阶段使用经纬度文本输入，用户体验不如地图标注直观。这是有意的 MVP 决策，后续集成百度地图时替换。

- **无输入消毒** → 后端应对输入做基本校验（`@NotBlank`、`@NotNull`），使用 JPA 参数化查询天然防 SQL 注入。

- **JPA DDL 自动生成** → 开发阶段可设 `spring.jpa.hibernate.ddl-auto=update` 方便迭代，但生产环境应使用 `validate` 并通过 SQL 脚本管理 schema。`database/create-table.sql` 提供手动建表脚本。
