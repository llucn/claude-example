## ADDED Requirements

### Requirement: 事件数量 Card

Dashboard SHALL 包含一个「事件数量」Card，展示系统中事件的统计摘要。

#### Scenario: 显示事件统计

- **WHEN** 用户查看 Dashboard 主页
- **THEN** 「事件数量」Card 显示以下统计项（使用静态/模拟数据）：
  - 正在进行的事件数量（标签：「进行中」）
  - 已完成的事件数量（标签：「已完成」）

#### Scenario: Card 标题可见

- **WHEN** 用户查看「事件数量」Card
- **THEN** Card 顶部显示标题「事件数量」

#### Scenario: 统计数字视觉突出

- **WHEN** 用户查看「事件数量」Card
- **THEN** 数字以大字号显示，配色区分进行中（蓝色/警告色）和已完成（绿色/成功色）

### Requirement: 事件数量 Card 默认尺寸

「事件数量」Card 的默认宽度 SHALL 为半宽（50%）。

#### Scenario: 初始渲染为半宽

- **WHEN** 用户首次访问 Dashboard（无已保存布局）
- **THEN** 「事件数量」Card 占据 Dashboard 宽度的 50%
