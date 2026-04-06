## MODIFIED Requirements

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
