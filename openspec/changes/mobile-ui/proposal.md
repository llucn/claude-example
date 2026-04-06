## Why

移动端 App 目前仅完成了 OIDC 认证流程，登录后显示的是 Nx 样板页面，没有实际的应用界面。救援队员无法查看个人信息，也缺少导航框架支撑后续功能（事件列表、地图等）的开发。需要建立 UI 基础设施——组件库、主题系统、导航结构和第一个业务页面（个人资料），为后续功能迭代打好地基。

## What Changes

- 集成 React Native Paper 作为 UI 组件库，配置 Material Design 3 主题
- 建立 `@react-navigation` 导航框架，包含底部 Tab 导航 + Stack 导航
- 创建 Home 页面（替换 Nx 样板页），作为主入口
- 创建 Profile 页面，调用后端 `GET /api/me` 接口显示当前登录用户信息
- 完成 `apiClient` 的 `configureApiClient` 初始化接入，使 API 调用可在整个应用中正常工作
- 更新 `App.tsx`，将 `AuthProvider` → `PaperProvider` → `NavigationContainer` 正确嵌套

## Capabilities

### New Capabilities

- `app-navigation`: 底部 Tab 导航 + Stack 导航结构，支持 Home、Profile 等页面切换
- `user-profile`: Profile 页面，通过后端接口获取并展示已登录用户的个人信息
- `ui-theming`: React Native Paper 集成与 Material Design 3 主题配置

### Modified Capabilities

_无需修改现有 spec 的需求定义。_

## Impact

- **依赖新增**: `react-native-paper`、`react-native-safe-area-context`、`@react-navigation/native`、`@react-navigation/bottom-tabs`、`@react-navigation/native-stack`、`react-native-screens`
- **代码变更**: `packages/mobile/src/app/` 目录下新增导航配置、页面组件、主题配置；重构 `App.tsx` 入口
- **API 依赖**: 后端 `GET /api/me` 端点（已实现）
- **`api-client.ts`**: 需要在 App 初始化时调用 `configureApiClient`，并将 `baseURL` 改为实际后端地址
