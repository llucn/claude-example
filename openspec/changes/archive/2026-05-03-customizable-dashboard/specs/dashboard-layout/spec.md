## ADDED Requirements

### Requirement: Dashboard Grid Container

系统 SHALL 提供一个基于12列网格的 Dashboard 容器，用于承载可配置的 Card 组件。

#### Scenario: 初始加载默认布局

- **WHEN** 用户首次访问主页（localStorage 中无已保存布局）
- **THEN** Dashboard 按默认顺序和尺寸渲染所有 Card

#### Scenario: 恢复已保存布局

- **WHEN** 用户访问主页且 localStorage 中存在 `dashboard-layout` 键
- **THEN** Dashboard 按保存的顺序和宽度渲染所有 Card

### Requirement: Card 拖拽排序

Dashboard 中的 Card SHALL 支持通过拖拽方式重新排列顺序。

#### Scenario: 拖拽改变顺序

- **WHEN** 用户拖动某个 Card 的拖拽手柄并释放到另一位置
- **THEN** Card 移动到目标位置，其他 Card 相应调整位置，布局立即持久化到 localStorage

#### Scenario: 拖拽过程中的视觉反馈

- **WHEN** 用户正在拖拽 Card
- **THEN** 被拖拽的 Card 呈现半透明占位效果，目标位置显示插入指示

### Requirement: Card 宽度调整

每个 Card SHALL 支持三种宽度：全宽（100%）、半宽（50%）、四分之一宽（25%）。

#### Scenario: 通过调整手柄改变宽度

- **WHEN** 用户拖动 Card 右下角的调整手柄向右或向左
- **THEN** Card 宽度在 25% → 50% → 100% 之间循环切换，并显示当前宽度标识（如 "1/4"、"1/2"、"全宽"）

#### Scenario: 宽度变更持久化

- **WHEN** 用户完成 Card 宽度调整
- **THEN** 新的宽度立即保存到 localStorage 中的 `dashboard-layout`

### Requirement: 布局持久化

Dashboard 布局状态 SHALL 持久化保存在浏览器 localStorage 中，key 为 `dashboard-layout`。

#### Scenario: 刷新页面保持布局

- **WHEN** 用户修改布局后刷新页面
- **THEN** Dashboard 恢复到修改后的布局状态，顺序和宽度与修改后一致
