## 1. 后端：事件查询 API

- [x] 1.1 在 `IssueController` 新增 `GET /api/issues` 端点，调用 service 返回按 `createdAt` 降序排列的 Issue 列表
- [x] 1.2 在 `IssueService` 新增 `getAllIssues()` 方法，调用 `IssueRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))`
- [x] 1.3 在 `IssueController` 新增 `GET /api/issues/{id}` 端点，id 不存在时返回 HTTP 404
- [x] 1.4 在 `IssueService` 新增 `getIssueById(Long id)` 方法，使用 `IssueRepository.findById(id)`，不存在时抛出 404 异常

## 2. 前端：API 客户端

- [x] 2.1 在前端 API 客户端层新增 `fetchIssues()` 函数，调用 `GET /api/issues`
- [x] 2.2 在前端 API 客户端层新增 `fetchIssueById(id)` 函数，调用 `GET /api/issues/:id`

## 3. 前端：事件列表页

- [x] 3.1 新建 `packages/web/src/app/pages/IssueListPage.tsx`，使用 Ant Design Table 展示事件列表
- [x] 3.2 Table 列配置：`id`（Link 跳转 `/issues/:id`）、`title`、`address`、`createdBy`、`createdAt`
- [x] 3.3 页面挂载时调用 `fetchIssues()`，加载数据填充 Table

## 4. 前端：事件详情页

- [x] 4.1 新建 `packages/web/src/app/pages/IssueDetailPage.tsx`，使用 Ant Design Descriptions 展示 Issue 完整字段
- [x] 4.2 通过 `useParams` 获取 `:id`，页面挂载时调用 `fetchIssueById(id)`
- [x] 4.3 后端返回 404 时页面显示错误提示信息
- [x] 4.4 添加「返回列表」按钮，点击跳转到 `/issues`

## 5. 前端：导航与路由

- [x] 5.1 在 `AppLayout.tsx` 的 `menuItems` 数组中新增「查看事件」菜单项（key: `/issues`）
- [x] 5.2 在 `app.tsx` 的 `<Routes>` 中新增 `/issues` → `IssueListPage` 路由
- [x] 5.3 在 `app.tsx` 的 `<Routes>` 中新增 `/issues/:id` → `IssueDetailPage` 路由
