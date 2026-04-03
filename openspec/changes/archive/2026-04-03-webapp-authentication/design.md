## Context

ERS（应急事件发布响应系统）目前 web 前端和 api 后端均无认证机制。项目技术选型已确定使用 Keycloak 作为身份提供者，通过 OIDC 协议实现统一认证。

当前状态：
- **web** (`packages/web`): React + react-router-dom，入口为 `main.tsx` → `BrowserRouter` → `App`，无任何认证逻辑
- **api** (`packages/api`): Spring Boot 4.0.5，仅有 `HealthController`（`/api/health`），无 Spring Security 依赖
- Keycloak 实例已部署（v26.5.6），访问地址：https://auth.developbranch.cn/
- 开发调试直接使用该地址，无需本地部署

## Goals / Non-Goals

**Goals:**
- Web 前端实现完整的 OIDC 登录流程（Authorization Code Flow with PKCE）
- Web 前端实现路由守卫，保护需认证的页面
- Web 前端实现 Token 自动刷新和登出功能
- API 后端作为 OAuth2 Resource Server 校验 JWT Access Token
- API 后端通过 Spring Security 保护业务接口，保留公开端点（如 `/api/health`）

**Non-Goals:**
- 不涉及 Keycloak 服务端的部署和 Realm 配置（假设已就绪）
- 不涉及角色/权限体系设计（本次仅实现认证，授权后续迭代）
- 不涉及移动端（Expo）认证
- 不涉及用户注册流程（由 Keycloak 管理）

## Decisions

### 1. Web 端 OIDC 客户端库：react-oidc-context

**选择**: 使用 `react-oidc-context`（基于 `oidc-client-ts`）

**理由**:
- 提供 React Hooks API（`useAuth`），与函数组件模式一致
- 底层 `oidc-client-ts` 是成熟的 OIDC 认证库，支持 PKCE、Token 自动刷新、Silent Renew
- 社区活跃，TypeScript 原生支持

**备选方案**:
- `keycloak-js`：Keycloak 官方 JS 适配器，耦合度高，不便后续切换 IdP
- 手动实现 OIDC 流程：工作量大且容易出安全漏洞

### 2. OIDC 流程：Authorization Code Flow with PKCE

**选择**: Authorization Code Flow + PKCE

**理由**:
- OAuth 2.1 推荐的公共客户端（SPA）标准流程
- 无需 Client Secret，适合前端应用
- PKCE 防止授权码拦截攻击

### 3. API 端安全框架：Spring Security OAuth2 Resource Server

**选择**: `spring-boot-starter-oauth2-resource-server`

**理由**:
- Spring Boot 官方方案，与框架深度集成
- 自动完成 JWT 签名验证、过期检查、Issuer 校验
- 通过 `application.properties` 配置即可连接 Keycloak

**备选方案**:
- 自定义 Filter 手动解析 JWT：维护成本高，容易遗漏安全校验

### 4. Web 端认证状态管理

**选择**: 由 `react-oidc-context` 的 `AuthProvider` 统一管理

**理由**:
- Token 存储在内存中（默认行为），避免 XSS 攻击风险
- 自动处理 Token 刷新，无需额外状态管理
- 通过 `useAuth` Hook 在任意组件获取认证状态

### 5. API 请求携带 Token

**选择**: 在 Web 端使用 HTTP 请求拦截器自动附加 `Authorization` Header

**理由**:
- 集中管理，避免每个请求手动添加
- 可在拦截器中统一处理 401 响应（触发重新登录）

## Risks / Trade-offs

- **[Keycloak 不可用]** → Web 端展示友好错误提示，API 端拒绝所有需认证请求。Keycloak 高可用由运维保障。
- **[Token 过期竞态]** → `oidc-client-ts` 内置 Token 刷新机制，在过期前自动 Silent Renew。API 端 401 响应由前端拦截器处理重试或跳转登录。
- **[CORS 配置]** → API 端需正确配置 CORS 允许 Web 端域名，否则预检请求将被拦截。在 Spring Security 配置中统一处理。
- **[开发环境配置]** → 开发调试统一使用 https://auth.developbranch.cn/（Keycloak v26.5.6）。生产环境通过 `application.properties` 的 profile 机制区分。
