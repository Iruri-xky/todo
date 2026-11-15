# Todo 待办清单

基于 Vue 3 + Vite 构建的轻量级待办清单应用，支持本地存储持久化、筛选、批量操作。

## 功能特性

- 新增、编辑、删除待办事项
- 标记完成/未完成
- 三种筛选视图：全部/未完成/已完成
- 全选/取消全选
- 一键清空已完成/清空全部（含确认）
- 数据自动保存至浏览器本地存储（localStorage）
- 响应式设计，支持桌面与移动端
- 列表进出动画
- 超长文本自动截断

## 技术栈

- **框架**：Vue 3 (Composition API + `<script setup>`)
- **构建工具**：Vite
- **语言**：JavaScript(ES6+)
- **样式**：CCS Variables + Flexbox + Media Querise
- **状态管理**：Vue 组合式函数(Composables)
- **数据持久化**：localStorage

## 项目结构

```
ToDo/
├── .vscode/
│   └── extensions.json
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── components/
│   │   ├── TodoItem.vue
│   │   ├── TodoTnput.vue
│   │   └── useTodos.js
│   ├── App.vue
│   └── main.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 快速开始

### 前置要求

- Node.js >= 22.18.0 或 >= 24.12.0
- npm 或 yarn

### 启动开发服务器

npm run dev

### 构建生产版本

npm run build

### 预览构建产物

npm run preview

打开浏览器访问`htt://localhost:5173/`即可使用。

## 使用说明

1. 在输入框输入待办内容，按回车或点击“添加”按钮。
2. 点击待办前的复选框标记完成/未完成。
3. 点击"编辑"按钮修改待办文字，按回车或点击"保存"确定。
4. 点击"删除"按钮移除单个待办。
5. 使用顶部的筛选按钮切换视图。
6. 使用"全选"复选框批量操作，或使用"清空已完成"'清空全部'按钮。

## 开发日志

- 完成组件拆分、本地存储、增删改查基础功能
- 增加筛选、批量操作，抽取 useTodos 组合式函数
- 样式美化、移动端适配、边界处理
- 全面自测、Bug修复、README编写

## 许可证

**MIT**

