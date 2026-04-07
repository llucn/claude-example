### Requirement: Issue Entity and Table

系统 SHALL 定义 `Issue` JPA 实体，映射到数据库 `issue` 表，包含以下字段：

| 字段 | 数据库列 | 类型 | 约束 |
|---|---|---|---|
| id | id | BIGINT | PK, AUTO_INCREMENT |
| title | title | VARCHAR(200) | NOT NULL |
| description | description | TEXT | NOT NULL |
| longitude | longitude | DECIMAL(10,7) | NOT NULL |
| latitude | latitude | DECIMAL(10,7) | NOT NULL |
| address | address | VARCHAR(500) | |
| deadline | deadline | DATETIME | NOT NULL |
| recruitCount | recruit_count | INT | |
| skillRequirement | skill_requirement | VARCHAR(500) | |
| createdBy | created_by | VARCHAR(100) | NOT NULL |
| createdAt | created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

#### Scenario: 实体正确映射到数据库表

- **WHEN** 应用启动并连接到 MariaDB
- **THEN** `Issue` 实体与 `issue` 表正确映射，可执行 CRUD 操作

### Requirement: Issue Repository

系统 SHALL 提供 `IssueRepository`（继承 `JpaRepository<Issue, Long>`）用于事件数据的持久化操作。

#### Scenario: 保存事件到数据库

- **WHEN** 调用 `issueRepository.save(issue)`
- **THEN** 事件数据被持久化到 `issue` 表，返回含自增 `id` 的实体

### Requirement: Database Schema Script

项目 SHALL 在 `database/create-table.sql` 中提供建表 SQL 脚本，可用于手动创建数据库表结构。

#### Scenario: SQL 脚本可执行

- **WHEN** 在 MariaDB 中执行 `database/create-table.sql`
- **THEN** 成功创建 `issue` 表，表结构与 JPA 实体定义一致

### Requirement: Database Connection Configuration

后端 SHALL 在 `application.properties` 中配置 MariaDB 数据源连接信息。

#### Scenario: 应用成功连接数据库

- **WHEN** 应用启动且 MariaDB 可用
- **THEN** 应用成功建立数据库连接，JPA 正常工作
