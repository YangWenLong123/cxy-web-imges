## Description

上传图片接口服务，支持上传，获取存储列表

## API

| 描述         | 类型 | 接口地址                                     | 参数 |
| ------------ | ---- | -------------------------------------------- | ---- |
| 获取图片列表 | GET  | <http://abc.alongweb.top:3000/upload/get>    |      |
| 上传图片     | POST | <http://abc.alongweb.top:3000/upload/single> | file |

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## ## Running the app

把 dist 目录文件夹上传到服务器域名下，包含 package.json 文件，确定服务器安装 node.pm2 环境.

```bash
 pnpm i
 pm2 start main.js
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
