### Requirement: Ant Design Integration

应用 SHALL 集成 `antd` v5 作为 UI 组件库。所有新建页面和组件 SHALL 优先使用 Ant Design 提供的组件。

#### Scenario: Ant Design 组件可用

- **WHEN** 应用启动
- **THEN** 所有页面可正常渲染 Ant Design 组件（Layout、Menu、Descriptions 等）

### Requirement: Application Layout

应用 SHALL 使用 Ant Design 的 `Layout` 组件建立统一布局结构：
- `Layout.Header`：包含顶部导航菜单和用户信息
- `Layout.Content`：包含路由渲染的页面内容

布局 SHALL 占满整个视口高度。

#### Scenario: 布局结构正确

- **WHEN** 用户访问应用任意页面
- **THEN** 页面显示顶部导航栏（Header）和下方内容区域（Content），整体占满视口
