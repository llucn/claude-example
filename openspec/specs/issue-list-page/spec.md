### Requirement: Issue List Page

Web 应用 SHALL 在路径 `/issues` 提供事件列表页，使用 Ant Design Table 展示所有事件，按 `createdAt` 降序排列。

表格 SHALL 包含以下列：`id`（可点击链接）、`title`、`address`、`createdBy`、`createdAt`。

`id` 列 SHALL 渲染为可点击的链接，点击后跳转到对应事件详情页 `/issues/:id`。

#### Scenario: 进入列表页加载事件

- **WHEN** 已认证用户导航到 `/issues`
- **THEN** 页面发起 GET /api/issues 请求，请求成功后以表格形式展示事件列表，按 createdAt 降序排列

#### Scenario: 点击 id 跳转详情

- **WHEN** 用户在事件列表表格中点击某行的 `id` 链接
- **THEN** 页面跳转到 `/issues/:id` 路径，展示对应事件的详情页

#### Scenario: 列表为空时显示空状态

- **WHEN** 已认证用户进入 `/issues`，且系统中没有任何事件
- **THEN** 表格显示空状态（Ant Design Table 默认空状态）
