# Keycloak 登录主题

本目录包含与系统整体风格一致的 Keycloak 登录主题。

## 主题特性

- 深色/浅色双主题支持
- 与 Web 应用一致的设计语言
- CSS Variables 驱动的主题系统
- 响应式布局，支持移动端
- 平滑的动画过渡效果
- Inter 字体系统

## 目录结构

```
login/
├── theme.properties           # 主题配置文件
├── template.ftl               # 基础页面模板
├── login.ftl                  # 登录页面模板
└── resources/
    ├── css/
    │   └── login.css          # 主题样式表
    └── img/
        └── favicon.ico        # 网站图标
```

## 部署步骤

### 1. 复制主题文件

将 `login/` 目录复制到 Keycloak 安装目录的 `themes/` 文件夹：

```bash
# 假设 Keycloak 安装在 /opt/keycloak
cp -r docs/theme/login /opt/keycloak/themes/bsr-login
```

### 2. 配置 Realm

1. 登录 Keycloak 管理控制台：https://auth.developbranch.cn/admin/
2. 选择 Realm（例如 `bsr`）
3. 进入 **Realm settings** → **Themes** 标签
4. 在 **Login theme** 下拉菜单中选择 `bsr-login`
5. 点击 **Save**

### 3. 清除缓存

重启 Keycloak 或清除主题缓存：

```bash
# 方式 1: 重启 Keycloak
systemctl restart keycloak

# 方式 2: 清除缓存目录
rm -rf /opt/keycloak/data/tmp/*
```

### 4. 验证

访问登录页面测试：
```
https://auth.developbranch.cn/realms/bsr/protocol/openid-connect/auth?client_id=bsr-web&redirect_uri=http://localhost:4200&response_type=code&scope=openid
```

## 主题切换

主题会自动从 `localStorage` 读取用户偏好：

- 默认：深色主题
- 存储键：`kc-theme`
- 可选值：`dark` 或 `light`

用户可以在应用中切换主题，设置会同步到登录页。

## 设计规范

### 颜色系统

**深色主题：**
- 背景：`#0b1120`
- 卡片：`#16202f`
- 主色：`#0ea5e9`
- 文本：`#e2e8f0`

**浅色主题：**
- 背景：`#F4F6F9`
- 卡片：`#FFFFFF`
- 主色：`#0284c7`
- 文本：`#111827`

### 字体

- 字体族：Inter, system-ui, sans-serif
- 标题：18px, 600
- 正文：14px
- 标签：13px, 500

### 间距

- 卡片内边距：36px
- 表单间距：16px
- 按钮高度：40px（含 padding）
- 边框圆角：卡片 16px，输入框/按钮 8px

## 自定义

### 修改 Logo

编辑 `template.ftl` 中的 `#kc-header` 部分，添加自定义 Logo：

```html
<div id="kc-header">
    <img src="${url.resourcesPath}/img/logo.svg" alt="Logo" style="height: 36px;">
    <div id="kc-header-wrapper">
        ${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}
    </div>
</div>
```

### 修改颜色

编辑 `resources/css/login.css` 中的 CSS Variables：

```css
[data-theme=dark] {
  --accent: #your-color;
  --accent-hover: #your-hover-color;
}
```

### 添加自定义样式

在 `login.css` 末尾添加自定义 CSS 规则。

## 故障排查

### 主题未生效

1. 检查主题名称是否正确配置
2. 确认文件权限（Keycloak 进程需要读取权限）
3. 清除浏览器缓存
4. 检查 Keycloak 日志：`/opt/keycloak/data/log/`

### 样式显示异常

1. 检查 `theme.properties` 中的 `styles` 路径
2. 确认 CSS 文件编码为 UTF-8
3. 使用浏览器开发者工具检查 CSS 是否加载

### 模板错误

1. 检查 `.ftl` 文件语法
2. 确认所有 Freemarker 变量正确闭合
3. 查看 Keycloak 服务器日志获取详细错误信息

## 相关文档

- [Keycloak 配置指南](../keycloak.md)
- [UI 样式规范](../style.md)
- [Keycloak 主题官方文档](https://www.keycloak.org/docs/latest/server_development/#_themes)

## 技术栈

- Keycloak 26.5.6
- Freemarker 模板引擎
- CSS Variables
- Inter 字体
