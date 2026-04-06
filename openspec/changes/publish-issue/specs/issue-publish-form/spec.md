## ADDED Requirements

### Requirement: Issue Publish Form Page

Web 应用 SHALL 提供「发布事件」页面，路径为 `/publish`，包含以下表单字段：

| 字段 | 组件 | 必填 |
|---|---|---|
| 事件名称 | Input | 是 |
| 事件描述 | Input.TextArea | 是 |
| 经度 | InputNumber | 是 |
| 纬度 | InputNumber | 是 |
| 地址 | Input | 否 |
| 截止时间 | DatePicker (showTime) | 是 |
| 招募人数 | InputNumber | 否 |
| 技能要求 | Input.TextArea | 否 |

页面底部 SHALL 提供「发布」按钮。

#### Scenario: 表单校验 — 必填字段为空

- **WHEN** 用户未填写任何必填字段，点击「发布」按钮
- **THEN** 表单显示对应字段的校验错误提示，不发送 API 请求

#### Scenario: 成功发布事件

- **WHEN** 用户填写所有必填字段并点击「发布」按钮
- **THEN** 前端调用 `POST /api/issues` 接口，成功后显示成功提示消息并重置表单

#### Scenario: 发布失败

- **WHEN** API 请求失败（网络错误或服务端错误）
- **THEN** 页面显示错误提示消息，表单数据保留不丢失
