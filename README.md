# 📝 New Blog

一个基于 **Next.js + React + NestJS** 构建的现代全栈博客系统。项目采用 `pnpm workspace` 管理，实现了前后端分离与 Monorepo 架构，

## 🛠 技术栈

| 领域 | 技术 |
| :--- | :--- |
| **前端框架** | Next.js (App Router), React |
| **后端框架** | NestJS, Node.js |
| **包管理** | pnpm (Workspace) |
| **构建工具** | Turbo, Turbopack |
| **语言** | TypeScript |

## 📂 项目结构

```
new--blog/
├── apps/
│   ├── blog-admin/          # 后台应用 (react.js)
│   ├── blog-client/         # 客户端 (Next.js)
│   └── blog-service/        # 服务端 (Nest.js)
├── scripts/          # 项目脚本
├── package.json      # 根配置文件
├── pnpm-workspace.yaml # Workspace 配置
├── turbo.json        # Turbo 管道配置
└── deploy.md         # 部署文档
```

## 🚀 快速开始

### 环境要求

*   Node.js (>= 18.0)
*   pnpm (>= 8.0)

### 安装与运行

1.  **克隆项目**
    ```bash
    git clone https://github.com/qrshi-Sss/new--blog.git
    cd new--blog
    ```

2.  **安装依赖**
    使用 pnpm 一键安装所有依赖（包括 `apps` 下的子项目）：
    ```bash
    pnpm install
    ```

3.  **启动开发服务器**
    同时启动前端和后端开发服务：
    ```bash
    pnpm dev
    ```
    前端应用默认运行在 `http://localhost:3000`，后端 API 默认运行在 `http://localhost:3001`（具体端口请查看各自 `package.json` 或 `.env` 文件）。

4.  **生产构建**
    ```bash
    pnpm build
    ```

## 📖 部署与文档

*   **部署指南**：请参考项目根目录下的 [deploy.md](./deploy.md) 文件。
*   **详细配置**：各应用的具体配置请查看 `apps/web` 和 `apps/api` 目录下的说明文件。

---

**感谢你关注 New Blog！如果觉得有用，别忘了点个 Star ⭐️**
