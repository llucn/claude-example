## MODIFIED Requirements

### Requirement: Route Configuration

应用 SHALL 配置以下路由：
- `/` → DashboardPage 组件（原为主页组件，现替换为 Dashboard）
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

#### Scenario: 主页路由渲染 Dashboard

- **WHEN** 用户访问 `/` 路径
- **THEN** 应用渲染 DashboardPage 组件，顶部菜单高亮「主页」项
