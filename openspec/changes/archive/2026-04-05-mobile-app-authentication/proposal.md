## Why

ERS 系统的 Web 端已完成 Keycloak OIDC 认证集成，但 Expo 移动端（`packages/mobile`）仍无认证机制。需要为移动端实现同等的 OIDC 登录能力，使用户能够通过 Keycloak 安全登录移动应用，并确保移动端 API 请求携带有效的 Access Token。

## What Changes

- 移动端集成 OIDC 登录流程（Authorization Code Flow with PKCE），使用系统浏览器完成 Keycloak 认证
- 移动端实现 Token 安全存储（使用设备 Secure Storage）
- 移动端实现 Token 自动刷新和登出功能
- 移动端增加认证守卫，未认证用户自动跳转登录流程
- 移动端 API 请求自动携带 Bearer Token
- 配置 Keycloak Client 支持移动端 Deep Link 回调（Custom URL Scheme）

## Capabilities

### New Capabilities

- `mobile-oidc-login`: 移动端 OIDC 登录认证流程，包括系统浏览器登录、Deep Link 回调、Token 安全存储、自动刷新和登出
- `mobile-api-auth`: 移动端 API 请求 Token 管理，包括请求拦截器自动附加 Bearer Token 和 401 处理

### Modified Capabilities

（无现有 capability 需要修改，API 后端 `api-auth` 已支持 JWT 校验，无需改动）

## Impact

- **packages/mobile**: 新增 `expo-auth-session`、`expo-web-browser`、`expo-secure-store` 等依赖，新增认证相关组件和 Auth Provider
- **app.json**: 需确认 `scheme` 配置用于 Deep Link 回调
- **Keycloak**: 需新增移动端 Client 配置（Valid Redirect URIs 包含 Custom URL Scheme）
- **API 后端**: 无需改动，已有的 JWT 校验机制对移动端 Token 同样生效
