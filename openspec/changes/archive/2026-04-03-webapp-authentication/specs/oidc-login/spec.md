## ADDED Requirements

### Requirement: OIDC 登录
用户访问 Web 管理系统时，系统 SHALL 通过 OIDC Authorization Code Flow with PKCE 将未认证用户重定向至 Keycloak 登录页面完成身份认证。

#### Scenario: 未登录用户访问受保护页面
- **WHEN** 未认证用户访问任意受保护页面
- **THEN** 系统自动重定向至 Keycloak 登录页面

#### Scenario: 用户完成 Keycloak 登录
- **WHEN** 用户在 Keycloak 登录页面输入正确凭据并提交
- **THEN** 系统接收授权码，交换获取 Access Token 和 Refresh Token，跳转至用户最初请求的页面

#### Scenario: 用户登录失败
- **WHEN** 用户在 Keycloak 登录页面认证失败
- **THEN** 由 Keycloak 展示错误提示，用户留在登录页面

### Requirement: 登出
用户 SHALL 能够从 Web 管理系统登出，同时结束 Keycloak 会话。

#### Scenario: 用户主动登出
- **WHEN** 已登录用户点击登出按钮
- **THEN** 系统清除本地 Token，重定向至 Keycloak 的 end_session_endpoint 完成单点登出，最终跳转回登录页面

### Requirement: Token 自动刷新
系统 SHALL 在 Access Token 过期前自动使用 Refresh Token 获取新的 Access Token，保持用户会话不中断。

#### Scenario: Access Token 即将过期
- **WHEN** Access Token 剩余有效期不足 60 秒
- **THEN** 系统自动使用 Refresh Token 向 Keycloak 请求新的 Access Token，用户无感知

#### Scenario: Refresh Token 已过期
- **WHEN** Refresh Token 也已过期，刷新请求失败
- **THEN** 系统清除本�� Token，重定向用户至 Keycloak 登录页面重新认证

### Requirement: 路由守卫
系统 SHALL 提供路由守卫组件，保护需要认证的页面路由。

#### Scenario: 已登录用户访问受保护页面
- **WHEN** 已认证用户访问受保护页面
- **THEN** 正常渲染页面内容

#### Scenario: 认证加载中
- **WHEN** 用户访问受保护页面且认证状态正在加载
- **THEN** 页面显示加载指示器，不闪烁登录页面

### Requirement: API 请求自动携带 Token
系统 SHALL 在发起 API 请求时自动在 HTTP Header 中附加 Access Token。

#### Scenario: 已登录用户发起 API 请求
- **WHEN** 已认证用户的前端代码发起 API 请求
- **THEN** 请求自动携带 `Authorization: Bearer <access_token>` Header

#### Scenario: API 返回 401 未授权
- **WHEN** API 返回 401 状态码
- **THEN** 系统尝试刷新 Token 并重试请求；若刷新失败，重定向用户至登录页面

### Requirement: 显示当前用户信息
系统 SHALL 能够从 OIDC Token 中解析并展示当前登录用户的基本信息。

#### Scenario: 显示用户名
- **WHEN** 用户已登录
- **THEN** 页面 Header 区域展示用户的名称（从 ID Token 的 `preferred_username` 或 `name` claim 获取）
