## Why

Web 管理系统目前仅完成了 OIDC 认证流程，登录后显示的是 Nx 脚手架占位页面（两个内联 div 路由），没有实际的应用界面。管理人员无法查看系统信息或个人资料。需要引入 UI 组件库和导航结构，建立第一批业务页面，为后续救援事件管理等功能打好基础。

## What Changes

- 集成 Ant Design 作为 UI 组件库
- 使用 Ant Design 的 `Layout` + `Menu` 组件建立顶部导航菜单结构
- 顶部菜单包含「主页」和「Profile」两个导航项
- 创建主页（Home），展示系统基本信息
- 创建 Profile 页面，调用后端 `GET /api/me` 接口显示当前登录用户信息
- 重构 `app.tsx`，替换 Nx 脚手架占位内容，整合 Ant Design 布局和路由
- 重构 `Header.tsx`，使用 Ant Design 组件替代内联样式

## Capabilities

### New Capabilities

- `webapp-navigation`: 顶部菜单导航结构，包含主页和 Profile 页面路由切换
- `webapp-profile`: Profile 页面，通过后端接口获取并展示已登录用户的个人信息
- `webapp-theming`: Ant Design 集成与布局配置

### Modified Capabilities

_无需修改现有 spec 的需求定义。_

## Impact

- **依赖新增**: `antd`、`@ant-design/icons`
- **代码变更**: `packages/web/src/app/` 目录下新增页面组件、重构 `app.tsx` 和 `Header.tsx`
- **API 依赖**: 后端 `GET /api/me` 端点（已实现）
- **样式变更**: 引入 Ant Design 的 CSS-in-JS 主题系统，替代现有内联样式
