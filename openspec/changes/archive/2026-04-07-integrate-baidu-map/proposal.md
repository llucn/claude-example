# Proposal: Integrate Baidu Map for Location Selection

## What

在 `PublishIssuePage` 中集成百度地图，允许用户通过点击地图来选择事件位置，替代现有的经度/纬度数字输入框。使用 `react-bmap` 库实现地图渲染与交互。

## Why

当前的经度/纬度输入框要求用户手动输入精确的数字坐标，体验不直观，普通用户难以使用。通过地图选点，用户可以直观地在地图上标记位置，系统自动提取坐标，大幅降低使用门槛，提升发布事件的体验。

## Scope

- 在 `PublishIssuePage` 的表单中，用百度地图组件替换"经度"和"纬度"两个 `InputNumber` 输入框
- 用户点击地图后，地图上显示标记点，并自动将经纬度填入表单隐藏字段
- 地图下方可选显示已选坐标的只读文本，方便用户确认
- 地址字段保留，用户仍可手动填写地址描述
- 百度地图 API Key 通过环境变量注入（`VITE_BAIDU_MAP_AK`）

## Out of Scope

- 逆地理编码（根据坐标自动填充地址字段）
- 移动端（React Native）地图集成
- 地图搜索功能
