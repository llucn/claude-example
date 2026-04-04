## ADDED Requirements

### Requirement: API 请求自动携带 Token
系统 SHALL 在移动端发起 API 请求时自动在 HTTP Header 中附加 Access Token。

#### Scenario: 已登录用户发起 API 请求
- **WHEN** 已认证用户的移动端代码发起 API 请求
- **THEN** 请求自动携带 `Authorization: Bearer <access_token>` Header，Token 从 Secure Store 读取

#### Scenario: API 返回 401 未授权
- **WHEN** API 返回 401 状态码
- **THEN** 系统尝试刷新 Token 并重试请求；若刷新失败，清除 Token 并跳转至登录界面

#### Scenario: Token 不存在时发起请求
- **WHEN** Secure Store 中无 Token 时尝试发起 API 请求
- **THEN** 请求不发送，系统跳转至登录界面
