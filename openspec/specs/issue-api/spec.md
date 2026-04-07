### Requirement: Create Issue Endpoint

后端 SHALL 提供 `POST /api/issues` 端点，接收事件创建请求。

**请求体字段**：
- `title` (String, 必填): 事件名称
- `description` (String, 必填): 事件描述
- `longitude` (BigDecimal, 必填): 经度
- `latitude` (BigDecimal, 必填): 纬度
- `address` (String, 选填): 地址描述
- `deadline` (LocalDateTime, 必填): 截止时间
- `recruitCount` (Integer, 选填): 招募人数
- `skillRequirement` (String, 选填): 技能要求

端点 SHALL 从当前认证用户的 JWT 中提取 `sub` claim 作为 `createdBy`。

#### Scenario: 成功创建事件

- **WHEN** 已认证用户发送合法的 POST 请求到 `/api/issues`
- **THEN** 服务端创建事件记录，返回 HTTP 201 和事件对象（含 `id`、`createdBy`、`createdAt`）

#### Scenario: 请求体校验失败

- **WHEN** 请求体缺少必填字段（如 title 为空）
- **THEN** 服务端返回 HTTP 400 和校验错误信息

#### Scenario: 未认证访问

- **WHEN** 未携带有效 JWT 的请求发送到 `/api/issues`
- **THEN** 服务端返回 HTTP 401
