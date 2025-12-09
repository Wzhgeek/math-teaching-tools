# GitHub Actions 自动构建 APK 使用说明

## 📋 前置条件

1. **GitHub 账号**
2. **Git 仓库**（本地或 GitHub）

## 🚀 快速开始

### 步骤 1：初始化 Git 仓库（如果还没有）

```bash
# 如果还没有初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 数学教学工具"
```

### 步骤 2：创建 GitHub 仓库并推送

1. 在 GitHub 上创建一个新仓库（例如：`math-teaching-tools`）
2. 不要初始化 README、.gitignore 或 license（因为本地已有文件）

3. 连接并推送代码：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3：触发构建

有两种方式触发构建：

#### 方式一：手动触发（推荐）

1. 打开 GitHub 仓库页面
2. 点击 `Actions` 标签
3. 选择 `Build Android APK` 工作流
4. 点击 `Run workflow` 按钮
5. 选择分支（通常是 `main`）
6. 点击绿色的 `Run workflow` 按钮

#### 方式二：自动触发

当你推送代码到 `main` 或 `master` 分支，并且修改了以下文件时，会自动触发构建：
- `app/**` 目录下的文件
- `android/**` 目录下的文件
- `capacitor.config.ts`
- `package.json`

### 步骤 4：下载 APK

构建完成后：

1. 在 `Actions` 页面找到完成的构建
2. 点击构建任务
3. 在 `Artifacts` 部分下载 `数学教学工具-APK`
4. 解压后即可获得 `app-debug.apk` 文件

## 📱 安装 APK

### 在 Android 设备上安装：

1. 将 APK 文件传输到 Android 设备
2. 在设备上启用"未知来源"安装：
   - 设置 → 安全 → 允许安装未知来源应用
3. 点击 APK 文件进行安装

### 使用 ADB 安装（如果有 Android SDK）：

```bash
adb install app-debug.apk
```

## 🔧 工作流配置说明

### 触发条件

- **手动触发**：随时可以在 GitHub Actions 页面手动运行
- **自动触发**：当推送代码到 main/master 分支时自动构建

### 构建环境

- **操作系统**：Ubuntu Latest
- **Java 版本**：17 (Temurin)
- **Node.js 版本**：18
- **Android SDK**：自动安装最新版本

### 输出文件

- **APK 位置**：`android/app/build/outputs/apk/debug/app-debug.apk`
- **Artifact 名称**：`数学教学工具-APK`
- **保留时间**：30 天

## 🐛 常见问题

### 1. 构建失败：找不到文件

**解决方案**：确保 `app` 目录和所有 HTML 文件都已提交到 Git

```bash
git add app/
git commit -m "Add app files"
git push
```

### 2. 构建失败：Gradle 错误

**解决方案**：检查 `android/build.gradle` 和 `android/app/build.gradle` 配置是否正确

### 3. 找不到 Artifacts

**解决方案**：
- 确保构建成功完成
- 检查 Actions 页面是否有错误
- 等待构建完成（通常需要 5-10 分钟）

### 4. 想要发布版本（Release）

工作流已配置自动创建 Release（仅在手动触发时）：
- 在 GitHub 仓库的 `Releases` 页面可以找到
- 包含 APK 文件下载链接

## 📝 自定义配置

### 修改构建分支

编辑 `.github/workflows/build-apk.yml`：

```yaml
on:
  push:
    branches:
      - main
      - develop  # 添加其他分支
```

### 修改 Java 版本

```yaml
- name: Setup Java
  uses: actions/setup-java@v4
  with:
    java-version: '11'  # 或 '17', '21'
```

### 禁用自动 Release

删除或注释掉 `Create Release` 步骤

## 🎯 下一步

1. ✅ 推送代码到 GitHub
2. ✅ 触发构建
3. ✅ 下载 APK
4. ✅ 在 Android 设备上测试

## 💡 提示

- 首次构建可能需要 10-15 分钟（下载依赖）
- 后续构建通常只需要 5-8 分钟
- APK 文件大小约 20-30MB
- 构建的 APK 是调试版本，适合测试使用

## 🔐 安全提示

- 调试版 APK 不需要签名即可安装
- 如果要发布到应用商店，需要生成签名版本
- 可以使用 `./gradlew assembleRelease` 构建发布版本（需要配置签名）

