### Requirement: Top Navigation Menu

应用 SHALL 在顶部导航栏中提供水平菜单，包含以下导航项：
- **主页** (Home)：路径 `/`
- **发布事件** (Publish Issue)：路径 `/publish`
- **Profile**：路径 `/profile`

菜单 SHALL 高亮当前所在页面对应的导航项。

#### Scenario: 页面加载后菜单高亮

- **WHEN** 用户访问 `/` 路径
- **THEN** 顶部菜单中「主页」项高亮显示

#### Scenario: 菜单导航到发布事件

- **WHEN** 用户点击顶部菜单中的「发布事件」项
- **THEN** 页面跳转到 `/publish` 路径，菜单高亮切换到「发布事件」项

#### Scenario: 菜单导航切换

- **WHEN** 用户点击顶部菜单中的「Profile」项
- **THEN** 页面跳转到 `/profile` 路径，菜单高亮切换到「Profile」项

### Requirement: Route Configuration

应用 SHALL 配置以下路由：
- `/` → 主页组件
- `/publish` → PublishIssuePage 组件
- `/profile` → Profile 组件

#### Scenario: 路由正确渲染

- **WHEN** 用户直接访问 `/profile` 路径
- **THEN** 应用渲染 Profile 页面组件，顶部菜单高亮「Profile」项

### Requirement: User Info in Header

顶部导航栏右侧 SHALL 显示当前登录用户的用户名和用户头像（Avatar），点击后展开下拉菜单，包含「登出」选项。

#### Scenario: 用户信息展示

- **WHEN** 用户已登录并访问任意页面
- **THEN** 顶部导航栏右侧显示用户名和头像

#### Scenario: 下拉菜单登出

- **WHEN** 用户点击顶部右侧头像/用户名，并在下拉菜单中点击「登出」
- **THEN** 应用调用 OIDC signoutRedirect，用户被重定向到 Keycloak 登出页面
