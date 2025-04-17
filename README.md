# electron-template

一个基于Electron + Vue的现代桌面应用开发模板

## 项目特性

- 基于最新的Electron和Vue技术栈
- 使用Vite构建，开发体验极佳
- 内置UnoCSS，支持原子化CSS；naive-ui框架；pinia；vue-router
- 已封装主线程日志工具函数
- 渲染层自动导入配置；开发环境点击DOM，自动打开IDE定位至源代码位置；vue开发工具
- 页面layout框架

## 快速开始

### 环境

- Node.js 22.14.0
- pnpm 10.8.0

### 开发

复制模板后需要修改的地方：

- 项目搜索修改 `electron-template` 、`com.iamc.template`字符串
- 修改`package.json`里的`productName`、`description` 等字段
- 文件命名统一使用中线

### 项目设置

1. 安装依赖
```bash
$ pnpm install
```

2. 启动开发服务器
```bash
$ pnpm dev
```

## 项目结构

```
├── build/                      # 应用构建相关静态资源（图标、证书、entitlement等）
├── dist/                       # 应用构建输出目录（自动生成，git 忽略）
├── resources/                  # 应用运行时依赖的静态资源
├── src/
│   ├── main/                   # Electron 主进程代码
│   │   ├── index.js            # 主进程入口
│   │   ├── utils/              # 主进程工具类（如日志、存储等）
│   │   ├── app/                # 主进程应用模块（窗口管理、菜单等）
│   │   ├── ipc/                # IPC 消息通信处理
│   │   └── config/             # 主进程配置文件
│   ├── preload/                # 预加载脚本（用于主进程与渲染层安全通信）
│   │   └── index.js
│   └── renderer/               # 渲染进程（前端 Vue 应用）
│       ├── src/
│       │   ├── main.js         # 渲染进程入口
│       │   ├── App.vue         # 入口 Vue 组件
│       │   ├── assets/         # 静态资源（图标、图片等）
│       │   ├── components/     # 公共组件
│       │   ├── stores/         # 状态管理（如 Pinia）
│       │   ├── routers/        # 路由
│       │   ├── utils/          # 前端工具函数
│       │   └── views/          # 页面级组件
│       └── index.html          # 前端入口 HTML
├── .vscode/                    # VSCode 编辑器配置
├── .env                        # 环境变量配置
├── .env.template               # 环境变量模板
├── package.json                # 项目依赖及脚本
├── electron.vite.config.mjs    # Electron Vite 配置
```
