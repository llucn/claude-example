# Design: Integrate Baidu Map for Location Selection

## Overview

在 `PublishIssuePage` 表单中，用一个可交互的百度地图组件替换现有的经度/纬度 `InputNumber` 输入框。用户点击地图选点，坐标自动写入表单字段，提交逻辑保持不变。

## Library

使用 `react-bmap`（npm 包 `react-bmap`），它是百度地图 JavaScript API 的 React 封装，提供 `Map`、`Marker`、`NavigationControl` 等组件。

百度地图 API Key 通过 Vite 环境变量 `VITE_BAIDU_MAP_AK` 注入，在 `index.html` 或组件初始化时加载 BMap JS SDK。

## Component Design

### `BaiduMapPicker` 组件

新建 `packages/web/src/app/components/BaiduMapPicker.tsx`，封装地图选点逻辑：

**Props:**
```ts
interface BaiduMapPickerProps {
  value?: { longitude: number; latitude: number };
  onChange?: (coords: { longitude: number; latitude: number }) => void;
}
```

**行为:**
- 渲染百度地图，默认中心点为合肥（117.17, 31.52），缩放级别 12
- 用户点击地图时，在点击位置放置 `Marker`，并调用 `onChange` 传出坐标
- 若 `value` 已有值，初始化时在对应位置显示 Marker
- 地图高度固定为 `400px`，宽度 `100%`

### `PublishIssuePage` 修改

- 移除 `longitude` 和 `latitude` 的 `Form.Item`（含 `Input.Group compact` 包装）
- 新增一个 `Form.Item`，`name` 设为 `location`，`label` 为「位置」，`rules` 要求必填
- 使用 `<BaiduMapPicker>` 作为该 `Form.Item` 的控件（通过 `Form.Item` 的 `valuePropName` 和 `trigger` 机制与 Ant Design Form 集成）
- 提交时从 `values.location` 中解构出 `longitude` 和 `latitude` 再组装 payload

## SDK Loading

在 `packages/web/index.html` 的 `<head>` 中动态插入百度地图 JS SDK script 标签：

```html
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=YOUR_AK&callback=onBMapLoad"></script>
```

实际 AK 值在构建时通过 Vite 的 `define` 或 `html` 插件从 `VITE_BAIDU_MAP_AK` 环境变量注入。

## Data Flow

```
用户点击地图
  → BaiduMapPicker.onClick
  → 更新内部 marker 位置
  → 调用 onChange({ longitude, latitude })
  → Ant Design Form 更新 location 字段
  → 用户点击「发布」
  → handleSubmit 从 values.location 取坐标
  → POST /api/issues payload 包含 longitude, latitude
```

## Dependencies

- 新增依赖：`react-bmap`（`packages/web` 或根 `package.json`）
- 环境变量：`VITE_BAIDU_MAP_AK`（需在 `.env` 或部署环境中配置）
