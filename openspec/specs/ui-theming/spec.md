### Requirement: React Native Paper Integration

应用 SHALL 集成 `react-native-paper` v5 作为 UI 组件库，使用 `PaperProvider` 包裹整个应用组件树。

所有新建页面和组件 SHALL 优先使用 React Native Paper 提供的组件（Button、Card、Text、Avatar、Appbar 等）。

#### Scenario: Paper Provider 正确配置

- **WHEN** 应用启动
- **THEN** `PaperProvider` 被正确挂载，所有子组件可访问 Paper 主题和组件

### Requirement: Custom Theme Configuration

应用 SHALL 基于 `MD3LightTheme` 创建自定义主题，覆盖以下设计令牌：
- Primary 色系：与项目品牌色 `#143055` 保持一致
- 圆角（roundness）：与现有设计语言统一

主题配置 SHALL 集中在 `src/app/theme/` 目录中管理。

#### Scenario: 统一品牌色

- **WHEN** 使用 Paper 组件（如 Button、Appbar）渲染 UI
- **THEN** 组件使用自定义主题中定义的品牌色，而非 Paper 默认紫色

### Requirement: Provider Nesting Order

应用的 Provider 嵌套顺序 SHALL 为：`AuthProvider` → `PaperProvider` → `NavigationContainer` → `SafeAreaProvider`。

此顺序确保认证状态全局可用、主题覆盖所有页面、导航容器正确处理安全区域。

#### Scenario: Provider 层级正确

- **WHEN** 应用组件树渲染
- **THEN** AuthProvider 在最外层，PaperProvider 在 NavigationContainer 外层，所有页面可同时访问认证状态和主题
