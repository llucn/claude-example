## 1. 依赖安装与基础配置

- [x] 1.1 安装 `expo-auth-session`、`expo-web-browser`、`expo-secure-store`、`expo-crypto` 依赖
- [x] 1.2 确认 `app.json` 中 `scheme` 已配置（用于 Deep Link 回调），如需调整则更新为合适的 scheme 值

## 2. 认证核心模块

- [x] 2.1 创建 OIDC 配置文件（authority、client_id、redirect_uri 使用 app scheme、scope 等参数），authority 指向 `https://auth.developbranch.cn/realms/<realm>`
- [x] 2.2 创建 `AuthContext`（React Context），封装认证状态（isAuthenticated、user、tokens）和操作（login、logout、refreshToken）
- [x] 2.3 实现登录函数：使用 `expo-auth-session` 发起 Authorization Code Flow with PKCE，调用系统浏览器跳转 Keycloak
- [x] 2.4 实现授权码交换：接收 Deep Link 回调后向 Keycloak token_endpoint 交换 Access Token 和 Refresh Token
- [x] 2.5 实现 Token 存储：使用 `expo-secure-store` 加密持久化 Access Token、Refresh Token 和过期时间
- [x] 2.6 实现登出函数：清除 Secure Store 中的 Token，重定向至 Keycloak end_session_endpoint

## 3. Token 刷新与会话恢复

- [x] 3.1 实现 Token 刷新函数：使用 Refresh Token 向 Keycloak 换取新的 Access Token
- [x] 3.2 应用启动时从 Secure Store 读取 Token，若 Access Token 过期则自动刷新，恢复登录状态
- [x] 3.3 实现前台定时检查：在 Access Token 剩余有效期不足 60 秒时自动刷新

## 4. 认证守卫与 UI 集成

- [x] 4.1 创建认证守卫组件，未认证用户展示登录界面，认证加载中显示 Splash Screen 或 Loading 指示器
- [x] 4.2 在 `App.tsx` 中用 `AuthProvider` 包裹应用根组件，将受保护界面包裹在认证守卫中
- [x] 4.3 实现用户信息展示：从 ID Token 解析 `preferred_username` 或 `name` claim，在界面中展示用户名和登出按钮

## 5. API 请求 Token 管理

- [x] 5.1 创建 HTTP 客户端（axios 实例或 fetch wrapper），配置请求拦截器从 Secure Store 读取并附加 `Authorization: Bearer <token>` Header
- [x] 5.2 配置响应拦截器：401 响应时尝试刷新 Token 并重试请求，刷新失败则清除 Token 并跳转登录界面

## 6. Keycloak 配置文档

- [x] 6.1 在 `docs/keycloak.md` 中新增移动端 Client 配置章节：记录移动端 Client 的创建步骤（Client ID、Capability Config、Valid Redirect URIs 使用 app scheme、Valid Post Logout Redirect URIs），以及移动端应用配置参数汇总（authority、client_id、redirect_uri）
