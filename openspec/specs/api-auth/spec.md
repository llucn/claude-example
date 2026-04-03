### Requirement: JWT Token 校验
API 后端 SHALL 作为 OAuth2 Resource Server，对所有受保护端点的请求校验 JWT Access Token 的签名、有效期和 Issuer。

#### Scenario: 携带有效 Token 的请求
- **WHEN** 请求携带有效的 `Authorization: Bearer <token>` Header
- **THEN** 请求正常通过安全校验，交由业务 Controller 处理

#### Scenario: 未携带 Token 的请求访问受保护端点
- **WHEN** 请求未携带 `Authorization` Header 且访问受保护端点
- **THEN** API 返回 `401 Unauthorized` 响应

#### Scenario: 携带过期 Token 的请求
- **WHEN** 请求携带的 Access Token 已过期
- **THEN** API 返回 `401 Unauthorized` 响应

#### Scenario: 携带无效签名 Token 的请求
- **WHEN** 请求携带的 Token 签名校验失败
- **THEN** API 返回 `401 Unauthorized` 响应

### Requirement: 公开端点豁免
API SHALL 允许特定端点无需认证即可访问。

#### Scenario: 访问健康检查端点
- **WHEN** 请求访问 `/api/health` 端点且未携带 Token
- **THEN** 请求正常处理，返回 `200 OK`

### Requirement: CORS 配置
API SHALL 配置 CORS 策略，允许 Web 前端域名的跨域请求。

#### Scenario: Web 前端发起跨域预检请求
- **WHEN** Web 前端域名发起 OPTIONS 预检请求
- **THEN** API 返回正确的 CORS 响应头，允许该域名访问

#### Scenario: 跨域请求携带 Authorization Header
- **WHEN** Web 前端发起携带 `Authorization` Header 的跨域请求
- **THEN** CORS 策略允许 `Authorization` Header 通过

### Requirement: 从 Token 解析用户身份
API SHALL 能够从已校验的 JWT Token 中提取当前请求用户的身份信息（如 subject、username）。

#### Scenario: Controller 获取当前用户信息
- **WHEN** 已通过认证的请求到达 Controller
- **THEN** Controller 可通过 Spring Security 的 `@AuthenticationPrincipal` 或 `SecurityContextHolder` 获取用户的 subject（`sub` claim）和其他 Token claims
