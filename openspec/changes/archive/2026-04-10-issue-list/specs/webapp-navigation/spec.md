## MODIFIED Requirements

### Requirement: Top Navigation Menu

应用 SHALL 在顶部导航栏中提供水平菜单，包含以下导航项：
- **主页** (Home)：路径 `/`
- **发布事件** (Publish Issue)：路径 `/publish`
- **查看事件** (View Issues)：路径 `/issues`
- **Profile**：路径 `/profile`

菜单 SHALL 高亮当前所在页面对应的导航项。

#### Scenario: 页面加载后菜单高亮

- **WHEN** 用户访问 `/` 路径
- **THEN** 顶部菜单中「主页」项高亮显示

#### Scenario: 菜单导航到发布事件

- **WHEN** 用户点击顶部菜单中的「发布事件」项
- **THEN** 页面跳转到 `/publish` 路径，菜单高亮切换到「发布事件」项

#### Scenario: 菜单导航到查看事件

- **WHEN** 用户点击顶部菜单中的「查看事件」项
- **THEN** 页面跳转到 `/issues` 路径，菜单高亮切换到「查看事件」项

#### Scenario: 菜单导航切换

- **WHEN** 用户点击顶部菜单中的「Profile」项
- **THEN** 页面跳转到 `/profile` 路径，菜单高亮切换到「Profile」项

## MODIFIED Requirements

### Requirement: Route Configuration

应用 SHALL 配置以下路由：
- `/` → 主页组件
- `/publish` → PublishIssuePage 组件
- `/issues` → IssueListPage 组件
- `/issues/:id` → IssueDetailPage 组件
- `/profile` → Profile 组件

#### Scenario: 路由正确渲染

- **WHEN** 用户直接访问 `/profile` 路径
- **THEN** 应用渲染 Profile 页面组件，顶部菜单高亮「Profile」项

#### Scenario: 路由渲染事件列表页

- **WHEN** 用户直接访问 `/issues` 路径
- **THEN** 应用渲染 IssueListPage 组件，顶部菜单高亮「查看事件」项

#### Scenario: 路由渲染事件详情页

- **WHEN** 用户直接访问 `/issues/42` 路径
- **THEN** 应用渲染 IssueDetailPage 组件，加载 id 为 42 的事件详情
