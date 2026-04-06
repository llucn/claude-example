### Requirement: Profile Screen Display

Profile 页面 SHALL 调用后端 `GET /api/me` 接口获取当前登录用户的信息，并展示以下字段：
- 用户头像（使用用户名首字母生成的 Avatar）
- 用户名 (`preferred_username`)
- 姓名 (`name`)
- 邮箱 (`email`)
- 用户 ID (`sub`)

#### Scenario: 成功加载用户信息

- **WHEN** 用户导航到 Profile 页面
- **THEN** 页面调用 `GET /api/me` 接口，展示用户的头像（首字母）、用户名、姓名、邮箱等信息

#### Scenario: 加载中状态

- **WHEN** Profile 页面正在请求 `/api/me` 数据
- **THEN** 页面 SHALL 显示加载指示器（ActivityIndicator）

#### Scenario: 加载失败

- **WHEN** `GET /api/me` 请求失败（网络错误或服务端错误）
- **THEN** 页面 SHALL 显示错误提示信息和重试按钮

### Requirement: Logout from Profile

Profile 页面 SHALL 提供登出按钮，点击后调用 AuthContext 的 `logout` 方法。

#### Scenario: 用户登出

- **WHEN** 用户在 Profile 页面点击「登出」按钮
- **THEN** 应用调用 Keycloak 的 end_session_endpoint 结束会话，清除本地令牌，返回登录界面

### Requirement: API Client Initialization

应用启动时 SHALL 调用 `configureApiClient`，传入 `refreshToken` 函数和导航到登录页的回调，确保 API 拦截器正常工作。

#### Scenario: API 客户端自动附加令牌

- **WHEN** Profile 页面发起 `GET /api/me` 请求
- **THEN** 请求自动携带 `Authorization: Bearer <access_token>` 头

#### Scenario: 令牌过期后自动刷新

- **WHEN** API 请求收到 401 响应
- **THEN** 客户端自动尝试刷新令牌并重试请求；若刷新失败则导航到登录页
