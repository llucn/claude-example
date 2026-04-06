## 1. 依赖安装与配置

- [x] 1.1 安装 React Native Paper 及其依赖：`react-native-paper`、`react-native-vector-icons`（可选，Paper 内置图标可用 `react-native-paper` 的 `Icon`）
- [x] 1.2 安装 React Navigation 依赖：`@react-navigation/native`、`@react-navigation/bottom-tabs`、`@react-navigation/native-stack`、`react-native-screens`、`react-native-safe-area-context`
- [x] 1.3 配置 `babel.config.js`，添加 `react-native-paper/babel` 插件（可选优化，用于 tree-shaking）
- [x] 1.4 配置环境变量 `EXPO_PUBLIC_API_BASE_URL`，更新 `api-client.ts` 的 `baseURL` 使用该环境变量

## 2. 主题与 UI 基础

- [x] 2.1 创建 `src/app/theme/theme.ts`，基于 `MD3LightTheme` 定义自定义主题（primary: `#143055`，roundness 等）
- [x] 2.2 创建 `src/app/theme/index.ts` 导出主题配置

## 3. 导航结构

- [x] 3.1 创建 `src/app/navigation/types.ts`，定义导航参数类型（RootTabParamList、HomeStackParamList、ProfileStackParamList）
- [x] 3.2 创建 `src/app/navigation/HomeStack.tsx`，实现首页 Stack Navigator
- [x] 3.3 创建 `src/app/navigation/ProfileStack.tsx`，实现个人资料 Stack Navigator
- [x] 3.4 创建 `src/app/navigation/BottomTabNavigator.tsx`，实现底部 Tab Navigator（首页 + 我的），配置 Tab 图标和标签

## 4. 页面实现

- [x] 4.1 创建 `src/app/screens/HomeScreen.tsx`，显示简洁的主页欢迎内容（替换 Nx 样板页）
- [x] 4.2 创建 `src/app/screens/ProfileScreen.tsx`，调用 `GET /api/me` 展示用户信息（Avatar、用户名、姓名、邮箱），包含加载态、错误态和重试按钮
- [x] 4.3 在 ProfileScreen 中集成登出按钮，调用 AuthContext 的 `logout` 方法

## 5. App 入口重构

- [x] 5.1 重构 `App.tsx`，按正确顺序嵌套 Provider：`AuthProvider` → `PaperProvider` → `NavigationContainer` → `AuthGuard` → `BottomTabNavigator`
- [x] 5.2 在 `App.tsx` 中调用 `configureApiClient`，传入 AuthContext 的 `refreshToken` 和导航到登录页的回调
- [x] 5.3 移除 Nx 样板页面代码（旧的 ScrollView 内容和相关样式）

## 6. 验证

- [x] 6.1 确保应用可正常构建（`nx build Mobile` 无报错）
- [x] 6.2 验证 TypeScript 类型检查通过，无 lint 错误
