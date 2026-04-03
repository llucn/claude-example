## Why

ERS 系统的所有功能都需要身份认证保护。当前 web（React）和 api（Spring Boot）两个 package 均无认证机制，需要集成 Keycloak OIDC 登录，使组织管理员能够安全登录 Web 管理系统，并确保后端 API 仅接受已认证的请求。

## What Changes

- Web 前端集成 OIDC 登录流程（Authorization Code Flow with PKCE），实现登录、登出、Token 自动刷新
- Web 前端增加路由守卫，未认证用户自动跳转至 Keycloak 登录页
- API 后端集成 Spring Security OAuth2 Resource Server，校验 JWT Access Token
- API 后端增加安全配置，保护业务接口（保留健康检查等公开端点）
- 增加 Keycloak 相关配置（Realm、Client ID、Issuer URL 等）

## Capabilities

### New Capabilities

- `oidc-login`: Web 前端 OIDC 登录认证流程，包括登录、登出、Token 管理和路由守卫
- `api-auth`: API 后端 JWT Token 校验与接口权限保护

### Modified Capabilities

（无现有 capability 需要修改）

## Impact

- **packages/web**: 新增 OIDC 客户端库依赖，新增认证相关组件和路由守卫
- **packages/api**: 新增 Spring Security OAuth2 Resource Server 依赖，新增安全配置类
- **基础设施**: 需要部署 Keycloak 实例，配置 Realm 和 Client
- **API 契约**: 所有业务 API 请求需携带 `Authorization: Bearer <token>` 请求头
