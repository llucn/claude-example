## Context

ERS 移动端（`packages/mobile`）是基于 Expo (React Native) 的应用，当前无任何认证机制。Web 端已完成 Keycloak OIDC 集成（使用 `react-oidc-context`），API 后端已配置为 OAuth2 Resource Server 并校验 JWT Token。

当前状态：
- **mobile** (`packages/mobile`): Expo 应用，入口为 `src/app/App.tsx`，无认证逻辑
- **api** (`packages/api`): Spring Boot，已集成 Spring Security OAuth2 Resource Server，校验 JWT Access Token
- Keycloak 实例已部署（v26.5.6），访问地址：https://auth.developbranch.cn/
- `app.json` 已配置 scheme: `@claude-example/mobile`，可用于 Deep Link 回调

## Goals / Non-Goals

**Goals:**
- 移动端实现完整的 OIDC 登录流程（Authorization Code Flow with PKCE），通过系统浏览器跳转 Keycloak
- 移动端实现 Token 安全存储（Secure Store）
- 移动端实现 Token 自动刷新和登出功能
- 移动端增加认证守卫，未认证用户自动触发登录流程
- 移动端 API 请求自动携带 Bearer Token 并处理 401 响应

**Non-Goals:**
- 不涉及 Keycloak 服务端部署和 Realm 配置（假设已就绪）
- 不涉及角色/权限体系设计（仅认证，授权后续迭代）
- 不涉及 Web 端认证改动
- 不涉及生物认证（指纹/面容识别）
- 不涉及离线 Token 缓存策略

## Decisions

### 1. OIDC 客户端库：expo-auth-session

**选择**: 使用 `expo-auth-session` + `expo-web-browser`

**理由**:
- Expo 官方认证方案，与 Expo 生态深度集成
- 底层使用系统浏览器（iOS: ASWebAuthenticationSession, Android: Custom Tabs），符合 OAuth 2.0 安全最佳实践（RFC 8252）
- 内置 PKCE 支持，自动生成 code_verifier 和 code_challenge
- 支持 Deep Link 回调，通过 app scheme 接收授权码

**备选方案**:
- `react-native-app-auth`：功能强大但需要 native module，增加构建复杂度
- WebView 内嵌登录页：违反 OAuth 安全最佳实践，用户无法验证 URL，存在凭据钓鱼风险

### 2. Token 存储：expo-secure-store

**选择**: 使用 `expo-secure-store` 存储 Token

**理由**:
- iOS 使用 Keychain、Android 使用 EncryptedSharedPreferences，数据加密存储
- 移动端不同于 Web（内存存储），应用随时可能被系统回收，需持久化 Token 以避免频繁重新登录
- Expo 官方库，无需 eject

**备选方案**:
- AsyncStorage：数据未加密，不适合存储敏感 Token
- 仅内存存储：应用每次冷启动都需重新登录，用户体验差

### 3. OIDC 流程：Authorization Code Flow with PKCE

**选择**: Authorization Code Flow + PKCE（与 Web 端一致）

**理由**:
- RFC 8252 推荐的移动端 OAuth 标准流程
- 无需 Client Secret（公共客户端）
- PKCE 防止授权码拦截攻击，对移动端尤为重要（Deep Link 可能被其他应用截获）

### 4. Token 刷新策略

**选择**: 应用前台时定时检查 + 请求失败时触发刷新

**理由**:
- 移动端无法像 Web 端使用 iframe Silent Renew
- 前台定时检查：在 Token 过期前主动刷新，避免请求失败
- 401 兜底：网络切换等场景下 Token 可能意外过期，通过拦截器重试

### 5. API 请求客户端

**选择**: 使用 fetch wrapper 或 axios 实例，配置请求/响应拦截器

**理由**:
- 与 Web 端方案一致，集中管理 Token 附加和 401 处理
- 从 Secure Store 读取 Token 并自动附加到请求 Header

## Risks / Trade-offs

- **[Deep Link 劫持]** → 使用 PKCE 缓解授权码被其他应用截获的风险。生产环境应考虑 Universal Links (iOS) / App Links (Android) 替代 Custom Scheme。
- **[Token 存储安全]** → Secure Store 依赖设备级加密。Root/越狱设备上安全性降低，但对大多数用户足够。
- **[系统浏览器体验]** → 跳转系统浏览器登录会短暂离开应用，但这是 OAuth 安全最佳实践要求的。首次登录后 Keycloak Session Cookie 可实现后续快速登录。
- **[Expo Go 限制]** → `expo-secure-store` 和 `expo-auth-session` 在 Expo Go 中可用，但 Deep Link 回调行为可能与 Development Build 不同，开发时需注意测试。
