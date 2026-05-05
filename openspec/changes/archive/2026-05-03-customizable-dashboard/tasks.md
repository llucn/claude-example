## 1. 依赖安装

- [x] 1.1 安装 `@dnd-kit/core` 和 `@dnd-kit/sortable` 到 `packages/web`

## 2. Dashboard 布局组件

- [x] 2.1 创建 `DashboardCard` 包装组件，包含拖拽手柄、宽度调整手柄、标题栏和内容插槽
- [x] 2.2 创建 `DashboardGrid` 容器组件，基于 Ant Design 24列网格渲染 Card 列表
- [x] 2.3 实现拖拽排序逻辑（`@dnd-kit/sortable`），支持拖拽改变 Card 顺序
- [x] 2.4 实现宽度切换逻辑，调整手柄在 6/12/24 列之间循环切换并显示宽度标识
- [x] 2.5 实现 `useDashboardLayout` hook，管理布局状态并持久化到 localStorage (`dashboard-layout`)

## 3. Dashboard Card 内容组件

- [x] 3.1 创建 `SystemInfoCard` 组件，展示静态系统信息（名称、组织、版本、技术栈）
- [x] 3.2 创建 `IssueCountCard` 组件，展示静态事件统计（进行中、已完成），数字大字号配色显示

## 4. Dashboard 页面组装

- [x] 4.1 创建 `DashboardPage` 组件，组合 `DashboardGrid`、`SystemInfoCard`、`IssueCountCard`
- [x] 4.2 配置默认布局：`SystemInfoCard` 和 `IssueCountCard` 各占半宽（span 12），排列在同一行

## 5. 路由更新

- [x] 5.1 在 `packages/web/src/app/app.tsx` 中将 `/` 路由从 `HomePage` 更新为 `DashboardPage`
- [x] 5.2 删除 `packages/web/src/app/pages/HomePage.tsx`（功能已由 DashboardPage 取代）

## 6. 样式与验收

- [x] 6.1 确认拖拽排序在浏览器中正常工作，拖拽过程有占位视觉反馈
- [x] 6.2 确认宽度切换手柄在三种宽度间正确循环，显示宽度标识
- [x] 6.3 确认刷新页面后布局（顺序和宽度）从 localStorage 正确恢复
- [x] 6.4 确认两个 Card 内容正常显示，IssueCountCard 数字颜色区分正确
