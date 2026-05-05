### Requirement: 系统信息 Card

Dashboard SHALL 包含一个「系统信息」Card，展示应用系统的基本元数据。

#### Scenario: 显示静态系统信息

- **WHEN** 用户查看 Dashboard 主页
- **THEN** 「系统信息」Card 显示以下字段（使用静态/模拟数据）：系统名称、英文名称、组织、版本、技术栈

#### Scenario: Card 标题可见

- **WHEN** 用户查看 「系统信息」Card
- **THEN** Card 顶部显示标题「系统信息」

### Requirement: 系统信息 Card 默认尺寸

「系统信息」Card 的默认宽度 SHALL 为半宽（50%）。

#### Scenario: 初始渲染为半宽

- **WHEN** 用户首次访问 Dashboard（无已保存布局）
- **THEN** 「系统信息」Card 占据 Dashboard 宽度的 50%
