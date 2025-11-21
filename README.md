# my-design — React 组件库

![License](https://img.shields.io/badge/license-MIT-green) ![Storybook](https://img.shields.io/badge/storybook-9-orange) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)

**my-design** 是一套基于 **React 18 + TypeScript** 的高质量前端组件库，提供丰富的 UI 组件和交互体验，适用于各种 Web 应用开发场景。

---

## 1️⃣ 项目概述

* 开发目标：提供统一风格、类型安全、可复用的前端 UI 组件
* 核心价值：

  * 高度可定制的主题样式
  * 完整的交互式文档
  * CI/CD 自动化流程保障组件质量

---

## 2️⃣ 技术栈与工具

| 层级    | 技术/工具                  | 用途            |
| ----- | ---------------------- | ------------- |
| 前端框架  | React 18 + TypeScript  | 核心组件开发，类型安全   |
| 样式管理  | Sass / SCSS            | 变量系统、混入、模块化样式 |
| 文档系统  | Storybook 9            | 交互式文档与示例      |
| 测试框架  | Jest + Testing Library | 单元测试与组件行为测试   |
| 代码质量  | ESLint, Husky          | 规范化代码与提交前检查   |
| CI/CD | GitHub Actions         | 自动化测试、构建、发布   |
| 部署平台  | GitHub Pages           | 文档在线访问        |

---

## 3️⃣ 核心组件

目前组件库包含 9 个核心组件：

* **Button** — 可配置样式、尺寸、图标
* **Alert** — 提示信息组件
* **Menu** — 菜单导航组件
* **Upload** — 文件上传组件
* **Progress** — 进度条组件
* **Icon** — 图标组件库
* **Transition** — 动画过渡组件
* **Input** — 输入框组件
* **AutoComplete** — 自动补全输入组件

**设计特点：**

* 每个组件包含：

  * TypeScript 类型定义
  * 独立样式文件（SCSS）
  * 测试文件（Jest + Testing Library）
* 支持统一主题变量，方便全局样式定制
* 采用组件化、模块化设计，便于维护与扩展

---

## 4️⃣ 文档系统

* **Storybook**：

  * 每个组件都有交互式文档和多场景示例
  * 提供 Welcome 页面，快速引导用户使用组件
  * 支持文档的静态构建与部署
* 文档访问：[GitHub Pages 示例](https://xzy1124.github.io/my-design)

---

## 5️⃣ 测试与 CI/CD

* 配置 **GitHub Actions**：

  * Push 时自动运行单元测试和 lint 检查
  * 构建组件库打包文件
  * 构建 Storybook 文档并部署到 GitHub Pages
* 确保每次提交和发布的质量稳定

---

## 6️⃣ 构建与发布

* **组件打包**：

  * 使用 Rollup / Vite 等工具生成可发布的 npm 包
  * 支持 ESM 与 CommonJS 模块
* **npm 发布**：

  * 自动执行代码质量检查
  * 生成发布文件并发布到 npm
* **文档部署**：

  * Storybook 文档通过 GitHub Pages 自动更新

---

## 7️⃣ 项目亮点（简历可写）

1. **React + TypeScript 全栈组件开发**：类型安全，提升开发体验
2. **模块化 SCSS 样式管理**：变量、混入、可定制主题
3. **Storybook 文档系统建设**：交互示例，提升团队协作效率
4. **单元测试与自动化 CI/CD**：保证组件质量和稳定性
5. **自动化部署**：GitHub Pages 展示组件库文档
6. **实际项目经验**：可直接在面试中展示组件交互能力

---

## 8️⃣ 使用方式

```bash
# 安装组件库（示例）
npm install my-design
# 或者
yarn add my-design
```

```tsx
import { Button, Alert } from "my-design";

export default function App() {
  return (
    <div>
      <Button type="primary">点击我</Button>
      <Alert type="success">操作成功</Alert>
    </div>
  );
}
```

---

## 9️⃣ 贡献

欢迎 Issues 或 Pull Request，改进组件库或添加新组件。

---
