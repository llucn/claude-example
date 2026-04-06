## Context

Web 管理系统（`packages/web`）基于 React 19 + Vite + React Router DOM v6（HashRouter），使用 Nx monorepo 管理。当前已完成 Keycloak OIDC 认证（通过 `react-oidc-context` + `oidc-client-ts`），`apiClient`（axios + Bearer token 拦截器）已可用。登录后显示 Nx 脚手架占位页面和一个简单的 `Header` 组件（用户名 + Logout 按钮，内联样式）。没有 UI 组件库、没有正式布局、没有业务页面。

后端已提供 `GET /api/me` 保护端点（返回 JWT claims），前端 `apiClient` 已配置好认证拦截器，`baseURL` 为 `/api`（通过 Vite 代理或部署时反向代理）。

## Goals / Non-Goals

**Goals:**

- 引入 Ant Design 作为统一 UI 组件库
- 使用 Ant Design 的 `Layout` + `Menu` 建立顶部导航菜单结构
- 顶部菜单包含「主页」和「Profile」两个导航项，与 React Router 路由联动
- 实现主页（Home），展示系统基本信息（系统名称、描述等）
- 实现 Profile 页面，调用 `GET /api/me` 展示当前登录用户信息
- 重构现有 `Header.tsx`，将用户名和登出按钮整合到 Ant Design 布局的顶部栏右侧

**Non-Goals:**

- 不实现救援事件管理、人员管理等业务功能（属于后续 change）
- 不引入全局状态管理库（Redux/Zustand），当前阶段 React 本地 state + OIDC Context 足够
- 不实现个人资料编辑功能，仅做只读展示
- 不实现侧边栏导航（当前页面数量少，顶部菜单足够）

## Decisions

### 1. UI 组件库：Ant Design

**选择**: `antd` v5（CSS-in-JS 主题引擎）

**理由**: Ant Design 是企业级 Web 应用最广泛使用的 React UI 库，提供完整的组件集（Layout、Menu、Descriptions、Avatar、Dropdown 等），与 React Router 集成成熟。v5 使用 CSS-in-JS 无需额外配置 CSS 加载器，与 Vite 开箱兼容。

**替代方案**: Material UI（更偏 Google 风格，与项目救援管理系统的企业后台场景不如 Ant Design 契合）；Arco Design（社区规模较小）。

### 2. 布局方案：Ant Design Layout

**选择**: `Layout` + `Layout.Header` + `Layout.Content` + `Menu`（水平模式）

**结构**:
```
Layout
  ├── Header
  │     ├── Menu (horizontal mode)
  │     │     ├── MenuItem: 主页 (/)
  │     │     └── MenuItem: Profile (/profile)
  │     └── 右侧: 用户名 + 登出按钮 (Dropdown)
  └── Content
        └── <Routes> (React Router)
```

**理由**: 顶部导航适合页面数量较少的管理后台，Ant Design 的 `Menu` 组件原生支持 `selectedKeys` 与路由路径联动。

### 3. 路由与菜单联动

**选择**: 使用 React Router 的 `useLocation` 获取当前路径，映射为 Menu 的 `selectedKeys`。点击 Menu Item 时通过 `useNavigate` 进行路由跳转。

**路由表**:
- `/` → HomeScreen
- `/profile` → ProfileScreen

### 4. Profile 页面数据获取

**选择**: 在 `ProfilePage` 组件内使用 `useEffect` + `apiClient.get('/me')` 获取用户信息，本地 `useState` 管理加载/错误/数据状态。使用 Ant Design 的 `Descriptions` 组件展示用户字段。

### 5. Header 重构

**选择**: 将现有 `Header.tsx` 的用户名和登出按钮整合到 `Layout.Header` 右侧。使用 Ant Design 的 `Dropdown` + `Avatar` 组件，点击头像显示下拉菜单（含登出选项）。

## Risks / Trade-offs

- **Ant Design 包体积** → v5 支持 tree-shaking，仅打包使用的组件。首次加载增加约 100-200KB（gzip），对管理后台可接受。

- **HashRouter 兼容性** → Ant Design Menu 与 HashRouter 配合使用时，`useLocation().pathname` 仍正常工作（HashRouter 解析 hash 后的路径），无兼容性问题。

- **现有样式冲突** → 当前仅有内联样式和空 CSS 文件，引入 Ant Design 的 CSS-in-JS 不会有冲突。全面替换现有内联样式。
