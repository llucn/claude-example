## 1. 数据库与后端基础设施

- [x] 1.1 在 `pom.xml` 中添加 `spring-boot-starter-data-jpa`、`spring-boot-starter-validation` 和 `mariadb-java-client` 依赖
- [x] 1.2 在 `application.properties` 中配置 MariaDB 数据源连接信息和 JPA 属性
- [x] 1.3 创建 `database/create-table.sql`，编写 `issue` 表建表 SQL 脚本

## 2. 后端实体与持久层

- [x] 2.1 创建 `Issue` JPA 实体类（`com.example.demo.entity.Issue`），定义所有字段和 JPA 注解
- [x] 2.2 创建 `IssueRepository` 接口（`com.example.demo.repository.IssueRepository`），继承 `JpaRepository<Issue, Long>`

## 3. 后端 API

- [x] 3.1 创建 `CreateIssueRequest` DTO 类（`com.example.demo.dto.CreateIssueRequest`），含 Bean Validation 注解
- [x] 3.2 创建 `IssueService`（`com.example.demo.service.IssueService`），实现事件创建逻辑
- [x] 3.3 创建 `IssueController`（`com.example.demo.controller.IssueController`），实现 `POST /api/issues` 端点，从 JWT 提取 `preferred_username` 作为 `createdBy`

## 4. 前端页面

- [x] 4.1 创建 `src/app/pages/PublishIssuePage.tsx`，使用 Ant Design Form 实现事件发布表单（所有字段、校验规则、提交逻辑）
- [x] 4.2 在 `AppLayout.tsx` 的 `menuItems` 中添加「发布事件」导航项（`/publish`）
- [x] 4.3 在 `app.tsx` 的 Routes 中添加 `/publish` → `PublishIssuePage` 路由

## 5. 验证

- [x] 5.1 确保后端 Maven 编译通过（`mvn compile`）
- [x] 5.2 确保前端构建通过（`nx build web`）
- [x] 5.3 验证前端 TypeScript 类型检查通过
