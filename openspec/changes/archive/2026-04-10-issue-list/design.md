## Context

当前 Web 应用已实现事件发布功能（POST /api/issues），但缺少查询入口。Issue 实体已包含完整字段（id、title、description、createdAt 等），IssueRepository 已继承 JpaRepository，后端具备扩展查询能力的基础。前端采用 React + Ant Design，路由使用 React Router，API 调用通过封装的 axios 客户端完成。

## Goals / Non-Goals

**Goals:**
- 在后端新增列表查询和详情查询两个只读端点
- 在前端新增事件列表页（/issues）和事件详情页（/issues/:id）
- 顶部导航栏新增「查看事件」入口
- 列表按 createdAt 降序排列（最新事件在前）

**Non-Goals:**
- 分页、搜索、过滤功能（首期不做）
- 事件编辑或删除
- 移动端适配变更

## Decisions

### 排序字段使用 createdAt 而非其他时间字段

Issue 实体有 `createdAt`（事件记录创建时间）和 `deadline`（截止时间）两个时间字段。用户需求为「按事件到排序」，即事件到来的顺序，对应 `createdAt`。选择 `createdAt` DESC（最新到达的在前）。

替代方案：按 `deadline` 排序——但 deadline 是截止时间，不代表事件到达顺序，排除。

### 后端使用 Spring Data Sort 而非自定义 JPQL

IssueRepository 继承 JpaRepository，调用 `findAll(Sort.by(Sort.Direction.DESC, "createdAt"))` 即可，无需自定义查询方法，保持简洁。

### 前端路由设计：列表 /issues，详情 /issues/:id

详情页通过路径参数 `:id` 获取 issue id，符合 RESTful 风格，且与前端 React Router `useParams` 用法一致。

### 前端列表使用 Ant Design Table，详情使用 Descriptions

Table 组件天然支持列定义和行点击，Descriptions 组件适合展示键值对详情，与项目已有 Ant Design 使用风格一致。

### 列表中 id 列渲染为可点击链接

使用 React Router `<Link to={/issues/${id}}>` 渲染 id，点击即跳转详情页，无需额外按钮。

## Risks / Trade-offs

- **数据量风险**：GET /api/issues 返回全量数据，若 issue 数量极大会有性能问题 → 首期可接受，后续按需引入分页
- **未认证访问**：列表和详情是否需要认证？与现有 POST 端点保持一致，要求 JWT 认证 → 前端已有 ProtectedRoute 包裹全部页面，后端 Spring Security 配置需包含新端点

## Migration Plan

1. 后端新增两个 GET 端点，不涉及数据库变更，无需迁移脚本
2. 前端新增页面和路由，不影响现有页面
3. 部署顺序：后端先部署，前端后部署（或同时部署均可）
