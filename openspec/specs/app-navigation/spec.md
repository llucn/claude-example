### Requirement: Bottom Tab Navigation

应用 SHALL 提供底部 Tab 导航栏，包含以下 Tab 入口：
- **首页** (Home)：显示主页内容，使用 `home` 图标
- **我的** (Profile)：显示个人资料页面，使用 `account` 图标

Tab 导航栏 SHALL 在所有已认证页面中始终可见。

#### Scenario: 应用启动后显示 Tab 导航

- **WHEN** 用户完成登录认证
- **THEN** 应用显示底部 Tab 导航栏，默认选中「首页」Tab，显示 Home 页面内容

#### Scenario: Tab 切换

- **WHEN** 用户点击底部「我的」Tab
- **THEN** 应用切换到 Profile 页面，底部导航栏高亮「我的」Tab

### Requirement: Stack Navigation per Tab

每个 Tab SHALL 内嵌独立的 Stack Navigator，支持页面堆栈导航（push/pop）。

Tab 切换时 SHALL 保留各 Tab 的导航状态（不会重置已打开的子页面）。

#### Scenario: Tab 内页面跳转保持状态

- **WHEN** 用户在首页 Tab 中进入子页面后切换到「我的」Tab
- **THEN** 再切回「首页」Tab 时，仍停留在之前的子页面

### Requirement: Auth Guard Integration

导航容器 SHALL 被 AuthGuard 包裹，仅在用户已认证时显示导航界面。

未认证用户 SHALL 看到登录页面而非导航界面。

#### Scenario: 未登录用户无法访问导航

- **WHEN** 用户未登录或令牌过期且刷新失败
- **THEN** 应用显示登录界面，不显示底部 Tab 导航
