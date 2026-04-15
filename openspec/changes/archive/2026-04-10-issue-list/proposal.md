## Why

当前 Web 应用缺乏浏览已发布事件的入口，用户无法查看系统中所有事件的列表及其详细信息。需要在顶部导航栏新增「查看事件」菜单，使用户能够按事件时间排序浏览事件列表，并进入单个事件的详情页。

## What Changes

- 在顶部导航栏新增「查看事件」菜单项，路径为 `/issues`
- 新增事件列表页面（IssueListPage），按事件到达时间排序展示所有事件
- 新增事件详情页面（IssueDetailPage），展示单个事件的完整信息
- 后端新增 `GET /api/issues` 列表查询端点（按时间排序）
- 后端新增 `GET /api/issues/{id}` 详情查询端点

## Capabilities

### New Capabilities

- `issue-list-page`: Web 端事件列表页，展示所有事件并支持按事件时间排序，点击 issue id 跳转到详情页
- `issue-detail-page`: Web 端事件详情页，展示单个事件的完整字段信息
- `issue-query-api`: 后端事件查询 API，提供列表（按时间排序）和详情两个端点

### Modified Capabilities

- `webapp-navigation`: 顶部导航栏新增「查看事件」菜单项（`/issues` 路径），路由配置新增对应条目

## Impact

- `packages/web/src/app/layouts/AppLayout.tsx`：新增菜单项
- `packages/web/src/app/app.tsx`：新增路由
- `packages/web/src/app/pages/`：新增 `IssueListPage.tsx`、`IssueDetailPage.tsx`
- 后端 issue 模块：新增列表和详情 API 端点
