# Tasks: Integrate Baidu Map for Location Selection

## 1. 安装依赖与环境配置

- [x] 1.1 在根 `package.json` 的 `dependencies` 中添加 `react-bmap` 依赖，并运行 `npm install`
- [x] 1.2 在 `packages/web/.env.example`（或根目录）中添加 `VITE_BAIDU_MAP_AK=` 占位，说明需要填入百度地图 AK
- [x] 1.3 在 `packages/web/index.html` 的 `<head>` 中添加百度地图 JS SDK `<script>` 标签，AK 值使用 `%VITE_BAIDU_MAP_AK%` 占位符（Vite HTML 环境变量替换）

## 2. 创建 BaiduMapPicker 组件

- [x] 2.1 新建 `packages/web/src/app/components/BaiduMapPicker.tsx`，实现地图选点组件：
  - Props: `value?: { longitude: number; latitude: number }`, `onChange?: (coords) => void`
  - 使用 `react-bmap` 的 `Map`、`Marker`、`NavigationControl` 组件
  - 默认中心：合肥（117.17, 31.52），zoom 12
  - 点击地图时更新 Marker 位置并调用 `onChange`
  - 地图高度 400px，宽度 100%

## 3. 修改 PublishIssuePage

- [x] 3.1 在 `packages/web/src/app/pages/PublishIssuePage.tsx` 中：
  - 移除 `longitude` 和 `latitude` 的 `Form.Item`（含 `Input.Group compact` 包装）
  - 移除 `IssueFormValues` 中的 `longitude` 和 `latitude` 字段，新增 `location: { longitude: number; latitude: number }`
  - 新增 `Form.Item name="location" label="位置"` 并嵌入 `<BaiduMapPicker>`
  - 修改 `handleSubmit`：从 `values.location` 解构 `longitude`、`latitude` 后组装 payload

## 4. 验证

- [x] 4.1 确保前端 TypeScript 类型检查通过（`nx run web:type-check` 或 `tsc --noEmit`）
- [x] 4.2 确保前端构建通过（`nx build web`）
