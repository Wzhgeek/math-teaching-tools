# 构建 Android APK 指南

## 当前状态

✅ Capacitor 项目已配置完成
✅ HTML 文件已同步到 Android 项目
❌ Android Studio 未安装

## 解决方案

### 方案一：安装 Android Studio（推荐）

#### 步骤：

1. **下载 Android Studio**
   - 访问：https://developer.android.com/studio
   - 下载 macOS 版本
   - 安装（约 1GB）

2. **首次启动配置**
   - 打开 Android Studio
   - 按照向导安装 Android SDK
   - 等待 SDK 下载完成（可能需要一些时间）

3. **构建 APK**
   ```bash
   # 打开项目
   npx cap open android
   
   # 或者在 Android Studio 中：
   # File → Open → 选择 android 目录
   ```

4. **在 Android Studio 中构建**
   - 点击菜单 `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - 等待构建完成
   - APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

---

### 方案二：使用命令行构建（需要 Android SDK）

如果你已经安装了 Android SDK（通过其他方式），可以使用命令行：

```bash
# 进入 android 目录
cd android

# 设置 Android SDK 路径（如果不在默认位置）
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

# 构建 APK
./gradlew assembleDebug

# APK 位置
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

### 方案三：使用在线构建服务（最简单，但需要网络）

#### 使用 GitHub Actions（免费）

1. 在项目根目录创建 `.github/workflows/build-apk.yml`：

```yaml
name: Build APK

on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      - name: Setup Android SDK
        uses: android-actions/setup-android@v2
      - name: Build APK
        run: |
          cd android
          ./gradlew assembleDebug
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug.apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

2. 推送到 GitHub
3. 在 GitHub Actions 中运行工作流
4. 下载构建好的 APK

---

### 方案四：使用 PWA Builder（最简单，无需 Android Studio）

如果你的应用可以部署到服务器：

1. **部署 HTML 文件**
   - 使用 GitHub Pages、Netlify、Vercel 等
   - 或者使用本地服务器

2. **生成 APK**
   - 访问：https://www.pwabuilder.com/
   - 输入你的网站地址
   - 点击 "Build My PWA"
   - 选择 Android，下载 APK

**优点**：
- ✅ 无需安装任何工具
- ✅ 在线生成
- ✅ 完全免费

**缺点**：
- ⚠️ 需要将应用部署到服务器
- ⚠️ 需要网络连接（除非完全离线）

---

## 推荐方案对比

| 方案 | 难度 | 需要工具 | 时间 | 推荐度 |
|------|------|----------|------|--------|
| Android Studio | ⭐⭐ | Android Studio (1GB) | 30-60分钟 | ⭐⭐⭐⭐⭐ |
| 命令行构建 | ⭐⭐⭐ | Android SDK | 10-20分钟 | ⭐⭐⭐⭐ |
| GitHub Actions | ⭐⭐ | GitHub账号 | 5分钟 | ⭐⭐⭐⭐ |
| PWA Builder | ⭐ | 服务器 | 5分钟 | ⭐⭐⭐ |

## 我的建议

**如果你想要最专业的方案**：
- 安装 Android Studio（方案一）

**如果你想要最快的方案**：
- 使用 PWA Builder（方案四）- 如果应用可以部署到服务器
- 或者使用 GitHub Actions（方案三）

**如果你已经有 Android SDK**：
- 使用命令行构建（方案二）

## 快速开始（PWA Builder - 推荐）

这是最简单的方案，无需安装任何工具：

1. 将 HTML 文件部署到 GitHub Pages：
   ```bash
   # 创建 gh-pages 分支
   git checkout -b gh-pages
   git add app/*.html
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

2. 在 GitHub 仓库设置中启用 GitHub Pages

3. 访问 https://www.pwabuilder.com/

4. 输入你的 GitHub Pages 地址（如：https://yourusername.github.io/toll/）

5. 点击 "Build My PWA" → 选择 Android → 下载 APK

## 需要帮助？

如果你选择安装 Android Studio，我可以提供详细的安装步骤。
如果你选择 PWA Builder，我可以帮你设置 GitHub Pages。

