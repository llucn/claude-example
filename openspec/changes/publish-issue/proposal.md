## Why

BSR 救援组织的核心业务流程是发布紧急救援事件、招募救援人员。目前系统仅有认证和基本页面框架，没有任何业务功能。需要实现第一个核心功能——救援事件发布，让管理人员能够通过 Web 管理系统创建和发布救援事件，包含事件信息、地点（地图标注）和招募需求。同时需要建立后端持久层基础设施（JPA + MariaDB），为后续功能打下数据基础。

## What Changes

- **Web 前端**：在顶部菜单添加「发布事件」导航项，创建事件发布表单页面
  - 表单字段：事件名称（必填）、事件描述（必填）、位置（地图标注，必填）、截止时间（必填）、招募人数（选填）、技能要求（选填）
  - 提交表单调用后端 API 接口
- **后端 API**：新增 `POST /api/issues` 端点，接收事件数据并存储到数据库
- **数据库**：引入 Spring Data JPA + MariaDB 驱动，创建 `issue` 实体和表
- **SQL 脚本**：输出建表 SQL 到 `database/create-table.sql`

## Capabilities

### New Capabilities

- `issue-publish-form`: Web 端事件发布表单页面，包含表单校验、地图选点和 API 提交
- `issue-api`: 后端事件 API 端点，处理事件创建请求
- `issue-persistence`: 事件数据持久层，JPA 实体、Repository 和数据库表定义

### Modified Capabilities

- `webapp-navigation`: 在顶部菜单中新增「发布事件」导航项

## Impact

- **前端依赖新增**：地图组件库（用于位置标注）
- **后端依赖新增**：`spring-boot-starter-data-jpa`、`mariadb-java-client`
- **前端代码变更**：`AppLayout.tsx` 菜单项、`app.tsx` 路由、新增事件发布页面
- **后端代码变更**：新增 Entity、Repository、Service、Controller；更新 `application.properties` 数据库配置
- **数据库**：新建 `issue` 表
- **新增文件**：`database/create-table.sql`
