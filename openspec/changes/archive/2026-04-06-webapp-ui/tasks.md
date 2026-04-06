## 1. 依赖安装

- [x] 1.1 安装 Ant Design 及图标库：`antd`、`@ant-design/icons`

## 2. 布局与导航

- [x] 2.1 创建 `src/app/layouts/AppLayout.tsx`，使用 Ant Design `Layout` + `Layout.Header` + `Layout.Content` 建立应用布局结构
- [x] 2.2 在 `AppLayout` 的 Header 中实现水平 `Menu`，包含「主页」(`/`) 和「Profile」(`/profile`) 两个导航项，使用 `useLocation` + `useNavigate` 与路由联动
- [x] 2.3 在 `AppLayout` 的 Header 右侧实现用户信息区域：Avatar + 用户名 + Dropdown 菜单（含登出选项），使用 `useAuth` 获取用户信息

## 3. 页面实现

- [x] 3.1 创建 `src/app/pages/HomePage.tsx`，展示系统基本信息（系统名称、描述、版本等）
- [x] 3.2 创建 `src/app/pages/ProfilePage.tsx`，调用 `GET /api/me` 展示用户信息（Descriptions 组件），包含加载态（Spin）、错误态（Alert + 重试按钮）

## 4. App 入口重构

- [x] 4.1 重构 `app.tsx`，替换 Nx 脚手架占位内容，整合 `AppLayout` + `ProtectedRoute` + React Router `Routes`（`/` → HomePage，`/profile` → ProfilePage）
- [x] 4.2 删除旧的 `Header.tsx` 组件（功能已合并到 `AppLayout`）
- [x] 4.3 删除 `nx-welcome.tsx` 脚手架文件

## 5. 验证

- [x] 5.1 确保应用可正常构建（`nx build web` 无报错）
- [x] 5.2 验证 TypeScript 类型检查通过
