### Requirement: Issue Detail Page

Web 应用 SHALL 在路径 `/issues/:id` 提供事件详情页，使用 Ant Design Descriptions 组件展示单个事件的完整字段。

页面 SHALL 展示以下字段：`id`、`title`、`description`、`address`、`longitude`、`latitude`、`deadline`、`recruitCount`、`skillRequirement`、`createdBy`、`createdAt`。

页面 SHALL 提供「返回列表」的导航入口（如按钮或面包屑），点击后跳转回 `/issues`。

#### Scenario: 进入详情页加载事件数据

- **WHEN** 已认证用户导航到 `/issues/:id`
- **THEN** 页面发起 GET /api/issues/:id 请求，成功后以 Descriptions 组件展示事件完整字段

#### Scenario: 事件不存在时显示错误提示

- **WHEN** 已认证用户访问 `/issues/:id`，后端返回 HTTP 404
- **THEN** 页面显示"事件不存在"或类似错误提示信息

#### Scenario: 点击返回跳转列表页

- **WHEN** 用户在事件详情页点击返回按钮或链接
- **THEN** 页面跳转回 `/issues` 事件列表页
