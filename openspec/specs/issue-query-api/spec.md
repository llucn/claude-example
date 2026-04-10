### Requirement: List Issues Endpoint

后端 SHALL 提供 `GET /api/issues` 端点，返回所有事件的列表，按 `createdAt` 降序排列（最新事件在前）。

端点 SHALL 要求有效的 JWT 认证。

响应体为 JSON 数组，每个元素包含 Issue 的完整字段：`id`、`title`、`description`、`longitude`、`latitude`、`address`、`deadline`、`recruitCount`、`skillRequirement`、`createdBy`、`createdAt`。

#### Scenario: 成功获取事件列表

- **WHEN** 已认证用户发送 GET 请求到 `/api/issues`
- **THEN** 服务端返回 HTTP 200 和 Issue JSON 数组，按 `createdAt` 降序排列

#### Scenario: 列表为空时返回空数组

- **WHEN** 数据库中无任何 Issue 记录，已认证用户发送 GET 请求到 `/api/issues`
- **THEN** 服务端返回 HTTP 200 和空 JSON 数组 `[]`

#### Scenario: 未认证访问列表端点

- **WHEN** 未携带有效 JWT 的请求发送到 `GET /api/issues`
- **THEN** 服务端返回 HTTP 401

### Requirement: Get Issue Detail Endpoint

后端 SHALL 提供 `GET /api/issues/{id}` 端点，按 id 返回单个事件的完整信息。

端点 SHALL 要求有效的 JWT 认证。

#### Scenario: 成功获取事件详情

- **WHEN** 已认证用户发送 GET 请求到 `/api/issues/{id}`，该 id 对应的记录存在
- **THEN** 服务端返回 HTTP 200 和对应 Issue 的完整 JSON 对象

#### Scenario: 事件不存在

- **WHEN** 已认证用户发送 GET 请求到 `/api/issues/{id}`，该 id 不存在
- **THEN** 服务端返回 HTTP 404

#### Scenario: 未认证访问详情端点

- **WHEN** 未携带有效 JWT 的请求发送到 `GET /api/issues/{id}`
- **THEN** 服务端返回 HTTP 401
