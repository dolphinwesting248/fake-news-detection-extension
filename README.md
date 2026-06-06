# Fake News Detection — 新闻检测浏览器扩展



基于 [Plasmo](https://www.plasmo.com/) 框架构建的 Chrome 浏览器扩展，用于自动检测新闻内容的真伪与类型。

## 功能



- 在扩展弹窗中粘贴新闻标题和正文内容
- 调用后端 API 自动分析新闻类型
- 支持检测 11 种新闻类别：
  - `fake`（虚假）· `satire`（讽刺）· `bias`（偏见）· `conspiracy`（阴谋论）· `state`（官方宣传）
  - `junksci`（伪科学）· `hate`（仇恨言论）· `clickbait`（标题党）· `unreliable`（不可靠）
  - `political`（政治倾向）· `reliable`（可信）
- 每种类型以不同颜色标签展示，区分度高
- 输入内容自动保存到会话存储，关闭弹窗不丢失

## 技术栈



| 类别   | 技术                      |
| ------ | ------------------------- |
| 框架   | Plasmo 0.90.5             |
| 前端   | React 18 + TypeScript 5.3 |
| HTTP   | Axios                     |
| 存储   | @plasmohq/storage         |
| 构建   | Parcel（Plasmo 内置）     |
| 包管理 | pnpm                      |

## 项目结构



```
├── src/
│   ├── popup.tsx                # 扩展弹窗主界面
│   ├── components/
│   │   └── Indicator.tsx        # 提示消息组件
│   ├── hooks/
│   │   └── useIndicator.tsx     # 提示消息逻辑 Hook
│   ├── utils/
│   │   └── sendQuery.ts         # API 请求封装
│   ├── constants/
│   │   └── Colors.ts            # 颜色与类型配置
│   └── types/
│       └── index.ts             # TypeScript 类型定义
├── assets/
│   └── icon.png                 # 扩展图标
├── .plasmo/                     # Plasmo 生成文件（已忽略）
├── build/                       # 构建产物
├── package.json
├── tsconfig.json
└── .prettierrc.mjs
```



## 快速开始



### 环境要求



- Node.js >= 18
- pnpm（推荐）

### 安装依赖



```
pnpm install
```



### 开发模式



```
pnpm dev
```



构建产物位于 `build/chrome-mv3-dev/`。在 Chrome 中加载该目录即可进行开发调试：

1. 打开 `chrome://extensions/`
2. 开启「开发者模式」
3. 点击「加载已解压的扩展程序」，选择 `build/chrome-mv3-dev/` 目录

### 生产构建



```
pnpm build
```



产物输出到 `build/chrome-mv3-prod/`。

### 打包



```
pnpm package
```



生成可直接发布的 `.zip` 文件。

## API 接口



扩展向后端发送 POST 请求进行新闻分析：

```
POST http://8.130.132.134:8000/predict
Content-Type: application/json

{
  "content": "新闻正文内容",
  "title": "新闻标题"
}
```



返回格式：

```
{
  "label": "fake"
}
```



## 配置



后端 API 地址硬编码在 `src/utils/sendQuery.ts` 中，如需修改请编辑该文件。扩展的 `host_permissions` 在 `package.json` 的 `manifest` 字段中配置。

## 许可



MIT
