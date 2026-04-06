## Context

移动端 App（`packages/mobile`）基于 Expo SDK 53 + React Native 0.79，使用 Nx monorepo 管理。当前已完成 Keycloak OIDC 认证（PKCE 授权码流程、SecureStore 令牌存储、自动刷新），但登录后仅显示 Nx 样板欢迎页。没有导航框架、没有 UI 组件库、没有业务页面。

后端已提供 `GET /api/me` 保护端点（返回 JWT claims），前端已有 `apiClient`（axios + auth 拦截器），但 `configureApiClient` 尚未在 `App.tsx` 中接入。`apiClient.baseURL` 当前为相对路径 `/api`，需改为后端绝对地址。

## Goals / Non-Goals

**Goals:**

- 引入 React Native Paper（Material Design 3）作为统一 UI 组件库和主题系统
- 建立 `@react-navigation` 导航骨架（Bottom Tabs + Native Stack），支撑后续功能页面扩展
- 实现 Profile 页面，调用 `GET /api/me` 展示已登录用户信息（用户名、邮箱等）
- 完成 `configureApiClient` 的接入，使所有业务页面可直接使用 `apiClient`
- 创建 Home 页面替换样板页，作为未来事件列表等功能的入口

**Non-Goals:**

- 不实现事件列表、地图、推送通知等业务功能（属于后续 change）
- 不引入状态管理库（Redux/Zustand），当前阶段使用 React Context 和组件本地 state 足够
- 不处理离线模式或数据缓存
- 不实现个人资料编辑功能，仅做只读展示

## Decisions

### 1. UI 组件库：React Native Paper

**选择**: `react-native-paper` v5（Material Design 3）

**理由**: Paper 提供完整的 MD3 组件集（Button、Card、Avatar、Appbar 等），与 React Native 深度集成，支持主题定制和暗色模式。相比 NativeBase（已停更）、Tamagui（学习曲线陡）或 RN Elements（组件覆盖不全），Paper 是社区活跃度和 API 稳定性最好的选择。

**替代方案**: Tamagui 性能更优但配置复杂，且项目初期组件数量有限不需要极致优化。

### 2. 导航方案：React Navigation 6

**选择**: `@react-navigation/native` + `@react-navigation/bottom-tabs` + `@react-navigation/native-stack`

**结构**:
```
NavigationContainer
  └── BottomTab.Navigator
        ├── HomeStack (Tab: "首页")
        │     └── HomeScreen
        └── ProfileStack (Tab: "我的")
              └── ProfileScreen
```

**理由**: React Navigation 是 React Native 社区标准导航库，Expo 原生支持。使用 Bottom Tab 符合移动端常见交互模式。每个 Tab 内嵌 Stack Navigator，为后续页面跳转预留空间（如从 Home 点击事件进入详情页）。

**替代方案**: Expo Router（基于文件系统的路由），但项目使用 Nx + 非标目录结构，Expo Router 的约定式路由反而增加配置成本。

### 3. 主题配置

**选择**: 使用 React Native Paper 的 `MD3LightTheme` 作为基础，自定义 primary 色系与项目品牌保持一致。

**方案**: 创建 `src/app/theme/theme.ts` 集中管理主题配色，导出供 `PaperProvider` 使用。保留现有 `#143055` 作为 primary color。

### 4. Provider 嵌套顺序

```tsx
<AuthProvider>
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomTabNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  </PaperProvider>
</AuthProvider>
```

**理由**: `AuthProvider` 最外层确保认证状态全局可用；`PaperProvider` 在 Navigation 外层确保所有页面可访问主题；`SafeAreaProvider` 处理安全区域。`AuthGuard` 放在 `NavigationContainer` 内部，包裹 Tab Navigator。

### 5. Profile 页面数据获取

**选择**: 在 `ProfileScreen` 组件内使用 `useEffect` + `apiClient.get('/api/me')` 获取用户信息，本地 `useState` 管理加载/错误/数据状态。

**理由**: 单一数据源、简单读取场景，不需要引入 React Query 或全局 store。AuthContext 已提供基础用户信息（从 ID Token 解析），但 `/api/me` 返回后端验证过的完整 claims，更可靠。

### 6. API Base URL 配置

**选择**: 使用环境变量 `EXPO_PUBLIC_API_BASE_URL` 配置后端地址，在 `api-client.ts` 中读取。开发环境默认指向 `http://<dev-server>:8080`。

**理由**: Expo 支持 `EXPO_PUBLIC_*` 前缀的环境变量，可在构建时注入，便于区分开发/预览/生产环境。

## Risks / Trade-offs

- **依赖体积增加** → React Native Paper + React Navigation 会增加约 200KB（gzip）的 bundle 大小。对于救援应用可接受，且后续功能开发必然需要这些库。

- **Paper 与自定义样式冲突** → 现有代码使用纯 `StyleSheet`。迁移过程中需逐步替换，本次仅新页面使用 Paper 组件，不改造现有 `UserHeader` 等组件。

- **`baseURL` 硬编码风险** → 通过 `EXPO_PUBLIC_API_BASE_URL` 环境变量解决。如果未设置，开发模式下 fallback 到 localhost。

- **导航结构后续扩展** → 当前仅 2 个 Tab，后续加入事件列表、地图等功能时需要增加 Tab。Bottom Tab 最多支持 5 个入口，符合规划。
