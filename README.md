# 数学教学工具 - Electron 打包说明

这是一个将HTML教学工具打包成Windows exe程序的Electron项目。

## 安装依赖

```bash
npm install
```

## 开发运行

```bash
npm start
```

## 打包成Windows exe

```bash
npm run build-win
```

打包完成后，exe文件会在 `dist` 目录中。

## 项目结构

- `main.js` - Electron主进程文件
- `index.html` - 应用主菜单页面
- `分母不为0.html` - 分式交互探究工具
- `小游戏.html` - 分数与分式分类游戏
- `长方形.html` - 长方形面积模型
- `package.json` - 项目配置文件

## 注意事项

1. 首次打包需要下载Electron，可能需要一些时间
2. 打包后的exe文件会比较大（约100-200MB），因为包含了Chromium浏览器内核
3. 如果需要图标，请准备 `icon.ico` 文件放在项目根目录

