## 1. API 后端 - Spring Security OAuth2 Resource Server

- [x] 1.1 在 `pom.xml` 添加 `spring-boot-starter-oauth2-resource-server` 和 `spring-boot-starter-security` 依赖
- [x] 1.2 在 `application.properties` 配置 Keycloak OIDC issuer-uri（`https://auth.developbranch.cn/realms/<realm>`）和 JWT 相关参数
- [x] 1.3 创建 `SecurityConfig` 配置类：配置 OAuth2 Resource Server、公开端点豁免（`/api/health`）、CORS 策略
- [x] 1.4 验证 JWT Token 校验功能：有效 Token 放行、无 Token 返回 401、过期/无效签名 Token 返回 401
- [x] 1.5 验证 Controller 可通过 `@AuthenticationPrincipal` 获取当前用户 subject 和 claims

## 2. Web 前端 - OIDC 登录集成

- [x] 2.1 安装 `react-oidc-context` 和 `oidc-client-ts` 依赖
- [x] 2.2 创建 OIDC 配置文件（authority、client_id、redirect_uri、scope 等参数），authority 指向 `https://auth.developbranch.cn/realms/<realm>`
- [x] 2.3 在 `main.tsx` 中用 `AuthProvider` 包裹应用根组件
- [x] 2.4 创建路由守卫组件 `ProtectedRoute`：未认证重定向登录、加载中显示 Loading 指示器
- [x] 2.5 在 `App.tsx` 中将受保护路由包裹在 `ProtectedRoute` 中
- [x] 2.6 创建 Header 组件：显示当前用户名（从 ID Token 解析）和登出按钮
- [x] 2.7 实现登出功能：清除本地 Token 并重定向至 Keycloak end_session_endpoint

## 3. Web 前端 - API 请求 Token 管理

- [x] 3.1 创建 HTTP 客户端（如 axios 实例），配置请求拦截器自动附加 `Authorization: Bearer <token>` Header
- [x] 3.2 配置响应拦截器：401 响应时尝试刷新 Token 并重试，刷新失败则跳转登录页
- [x] 3.3 配置 `react-oidc-context` 的 automaticSilentRenew 实现 Token 自动刷新

## 4. Keycloak 配置文档

- [x] 4.1 编写 `docs/keycloak.md`：记录 Realm 创建、Client 配置（Client ID、Valid Redirect URIs、Web Origins、Access Token Lifespan 等）、所需的参数清单和操作步骤
