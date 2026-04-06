## ADDED Requirements

### Requirement: Profile Page Display

Profile 页面 SHALL 调用后端 `GET /api/me` 接口获取当前登录用户的信息，并使用 Ant Design `Descriptions` 组件展示以下字段：
- 用户名 (`preferred_username`)
- 姓名 (`name`)
- 邮箱 (`email`)
- 用户 ID (`sub`)

#### Scenario: 成功加载用户信息

- **WHEN** 用户导航到 Profile 页面
- **THEN** 页面调用 `GET /api/me` 接口，使用 Descriptions 组件展示用户名、姓名、邮箱、用户 ID

#### Scenario: 加载中状态

- **WHEN** Profile 页面正在请求 `/api/me` 数据
- **THEN** 页面 SHALL 显示加载指示器（Spin 组件）

#### Scenario: 加载失败

- **WHEN** `GET /api/me` 请求失败（网络错误或服务端错误）
- **THEN** 页面 SHALL 显示错误提示（Alert 组件）和重试按钮
