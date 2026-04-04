### Requirement: OIDC 登录
移动端用户 SHALL 能够通过 OIDC Authorization Code Flow with PKCE，跳转至系统浏览器的 Keycloak 登录页面完成身份认证。

#### Scenario: 未登录用户打开应用
- **WHEN** 未认证用户打开应用
- **THEN** 系统展示登录界面，用户点击登录按钮后跳转至系统浏览器的 Keycloak 登录页面

#### Scenario: 用户完成 Keycloak 登录
- **WHEN** 用户在系统浏览器中完成 Keycloak 登录
- **THEN** 系统通过 Deep Link 回调接收授权码，交换获取 Access Token 和 Refresh Token，存储至 Secure Store，返回应用主界面

#### Scenario: 用户取消登录
- **WHEN** 用户在系统浏览器中取消登录或关闭浏览器
- **THEN** 应用保持在登录界面，显示可重新登录的状态

#### Scenario: 用户登录失败
- **WHEN** 用户在 Keycloak 登录页面认证失败
- **THEN** 由 Keycloak 在系统浏览器中展示错误提示，用户留在登录页面

### Requirement: 登出
用户 SHALL 能够从移动应用登出，清除本地 Token 并结束 Keycloak 会话。

#### Scenario: 用户主动登出
- **WHEN** 已登录用户点击登出按钮
- **THEN** 系统清除 Secure Store 中的 Token，重定向至 Keycloak 的 end_session_endpoint 完成单点登出，返回登录界面

### Requirement: Token 安全存储
系统 SHALL 将 Access Token 和 Refresh Token 加密存储在设备的安全存储中。

#### Scenario: Token 持久化存储
- **WHEN** 用户完成登录获取 Token
- **THEN** Token 存储至 expo-secure-store（iOS Keychain / Android EncryptedSharedPreferences）

#### Scenario: 应用冷启动恢复会话
- **WHEN** 用户关闭应用后重新打开，且 Secure Store 中存在有效 Token
- **THEN** 系统自动恢复认证状态，直接进入应用主界面，无需重新登录

#### Scenario: Token 已过期的冷启动
- **WHEN** 用户重新打开应用，Access Token 已过期但 Refresh Token 有效
- **THEN** 系统自动使用 Refresh Token 刷新 Access Token，用户无感知进入主界面

### Requirement: Token 自动刷新
系统 SHALL 在 Access Token 过期前自动使用 Refresh Token 获取新的 Access Token。

#### Scenario: Access Token 即将过期
- **WHEN** 应用在前台运行且 Access Token 剩余有效期不足 60 秒
- **THEN** 系统自动使用 Refresh Token 向 Keycloak 请求新的 Access Token 并更新 Secure Store

#### Scenario: Refresh Token 已过期
- **WHEN** Refresh Token 也已过期，刷新请求失败
- **THEN** 系统清除 Secure Store 中的 Token，跳转至登录界面要求用户重新认证

### Requirement: 认证守卫
系统 SHALL 保护应用的受保护界面，仅已认证用户可访问。

#### Scenario: 已登录用户访问应用
- **WHEN** 已认证用户打开应用或导航至受保护界面
- **THEN** 正常渲染界面内容

#### Scenario: 认证加载中
- **WHEN** 应用启动且正在检查 Secure Store 中的认证状态
- **THEN** 显示 Splash Screen 或加载指示器，不闪烁登录界面

### Requirement: 显示当前用户信息
系统 SHALL 能够从 OIDC Token 中解析并展示当前登录用户的基本信息。

#### Scenario: 显示用户名
- **WHEN** 用户已登录
- **THEN** 应用界面展示用户的名称（从 ID Token 的 `preferred_username` 或 `name` claim 获取）
