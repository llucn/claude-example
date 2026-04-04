# Keycloak 配置指南

本文档记录 ERS 系统接入 Keycloak OIDC 认证所需的配置参数和操作步骤。

## 环境信息

| 项目 | 值 |
|------|------|
| Keycloak 版本 | 26.5.6 |
| 访问地址 | https://auth.developbranch.cn/ |
| 管理控制台 | https://auth.developbranch.cn/admin/ |

## 1. 创建 Realm

1. 登录 Keycloak 管理控制台
2. 点击左上角 Realm 下拉菜单 → **Create realm**
3. 填写配置：

| 参数 | 值 | 说明 |
|------|------|------|
| Realm name | `bsr` | BSR 组织专用 Realm |
| Enabled | ON | |

4. 点击 **Create**

## 2. 创建 Client（Web 前端）

1. 进入 **Clients** → **Create client**
2. 按步骤填写：

### Step 1: General Settings

| 参数 | 值 |
|------|------|
| Client type | OpenID Connect |
| Client ID | `bsr-web` |
| Name | BSR Web 管理系统 |

### Step 2: Capability Config

| 参数 | 值 | 说明 |
|------|------|------|
| Client authentication | OFF | SPA 公共客户端，无需 Client Secret |
| Authorization | OFF | |
| Authentication flow | 勾选 Standard flow | Authorization Code Flow |

### Step 3: Login Settings

| 参数 | 值 | 说明 |
|------|------|------|
| Root URL | `http://localhost:4200` | 开发环境 Web 前端地址 |
| Home URL | `http://localhost:4200` | |
| Valid redirect URIs | `http://localhost:4200/*` | 开发环境回调地址 |
| Valid post logout redirect URIs | `http://localhost:4200/*` | 登出后跳转地址 |
| Web origins | `http://localhost:4200` | CORS 允许的源 |

> **生产环境**：需将上述 `http://localhost:4200` 替换为实际域名，可添加多个值。

3. 点击 **Save**

## 3. 创建 Client（移动端）

1. 进入 **Clients** → **Create client**
2. 按步骤填写：

### Step 1: General Settings

| 参数 | 值 |
|------|------|
| Client type | OpenID Connect |
| Client ID | `bsr-mobile` |
| Name | BSR 移动应用 |

### Step 2: Capability Config

| 参数 | 值 | 说明 |
|------|------|------|
| Client authentication | OFF | 移动端公共客户端，无需 Client Secret |
| Authorization | OFF | |
| Authentication flow | 勾选 Standard flow | Authorization Code Flow with PKCE |

### Step 3: Login Settings

| 参数 | 值 | 说明 |
|------|------|------|
| Root URL | 留空 | |
| Valid redirect URIs | `claude-example-mobile://auth` | Deep Link 回调地址（Custom URL Scheme） |
| Valid redirect URIs | `exp+claude-example-mobile://auth` | Expo Go 开发调试回调地址 |
| Valid post logout redirect URIs | `claude-example-mobile://auth` | 登出后回调地址 |
| Web origins | `+` | 自动使用 Valid redirect URIs 中的来源 |

> **注意**：`expo-auth-session` 在 Expo Go 中生成的 redirect URI 以 `exp+` 为前缀，Development Build 和生产包使用 Custom Scheme（`@claude-example/mobile://`），两者均需添加至 Valid redirect URIs。

3. 点击 **Save**

## 4. Token 配置

进入 **Realm settings** → **Tokens** 页签：

| 参数 | 推荐值 | 说明 |
|------|------|------|
| Access Token Lifespan | 5 minutes | Access Token 有效期 |
| SSO Session Idle | 30 minutes | 会话空闲超时 |
| SSO Session Max | 10 hours | 会话最大时长 |

进入 **Clients** → `bsr-web` → **Advanced** 页签：

| 参数 | 推荐值 | 说明 |
|------|------|------|
| Access Token Lifespan | 留空（继承 Realm） | 可按需覆盖 |

## 5. 创建测试用户

1. 进入 **Users** → **Create user**
2. 填写信息：

| 参数 | 示例值 |
|------|------|
| Username | `admin` |
| Email | `admin@bsr.org` |
| First name | `Admin` |
| Last name | `User` |
| Email verified | ON |

3. 点击 **Create**
4. 进入 **Credentials** 页签 → **Set password**：
   - 输入密码
   - Temporary 设为 OFF（避免首次登录强制修改）

## 6. 应用配置参数汇总

### Web 前端（packages/web）

配置文件：`src/app/auth/oidc-config.ts`

| 参数 | 值 |
|------|------|
| authority | `https://auth.developbranch.cn/realms/bsr` |
| client_id | `bsr-web` |
| redirect_uri | `window.location.origin` |
| post_logout_redirect_uri | `window.location.origin` |
| scope | `openid profile email` |

### API 后端（packages/api）

配置文件：`src/main/resources/application.properties`

| 参数 | 值 |
|------|------|
| spring.security.oauth2.resourceserver.jwt.issuer-uri | `https://auth.developbranch.cn/realms/bsr` |

### 移动端（packages/mobile）

配置文件：`src/app/auth/oidc-config.ts`

| 参数 | 值 |
|------|------|
| authority | `https://auth.developbranch.cn/realms/bsr` |
| client_id | `bsr-mobile` |
| redirect_uri | `@claude-example/mobile://auth`（由 `makeRedirectUri` 生成） |
| scope | `openid profile email` |

## 7. 验证配置

### 检查 OIDC Discovery

访问以下地址确认 Keycloak Realm 配置正确：

```
https://auth.developbranch.cn/realms/bsr/.well-known/openid-configuration
```

应返回包含以下关键端点的 JSON：
- `authorization_endpoint`
- `token_endpoint`
- `end_session_endpoint`
- `jwks_uri`

### 检查 JWKS

```
https://auth.developbranch.cn/realms/bsr/protocol/openid-connect/certs
```

API 后端使用此端点获取公钥验证 JWT 签名。

### 测试登录流程

1. 启动 Web 前端（`npx nx serve web`）
2. 访问 `http://localhost:4200`
3. 应自动重定向至 Keycloak 登录页
4. 使用测试用户登录
5. 登录成功后应跳转回应用首页，Header 显示用户名
