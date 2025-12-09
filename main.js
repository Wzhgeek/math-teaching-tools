const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'icon.png'), // 如果有图标文件
    show: false // 先不显示，等加载完成后再显示
  });

  // 创建菜单
  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '分式交互探究工具',
          click: () => {
            mainWindow.loadFile('分母不为0.html');
          }
        },
        {
          label: '分数与分式分类游戏',
          click: () => {
            mainWindow.loadFile('小游戏.html');
          }
        },
        {
          label: '长方形面积模型',
          click: () => {
            mainWindow.loadFile('长方形.html');
          }
        },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '工具',
      submenu: [
        {
          label: '分式交互探究工具',
          click: () => {
            mainWindow.loadFile('分母不为0.html');
          }
        },
        {
          label: '分数与分式分类游戏',
          click: () => {
            mainWindow.loadFile('小游戏.html');
          }
        },
        {
          label: '长方形面积模型',
          click: () => {
            mainWindow.loadFile('长方形.html');
          }
        }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '关于',
              message: '数学教学工具 v1.0.0',
              detail: '包含三个数学教学工具：\n1. 分式交互探究工具\n2. 分数与分式分类游戏\n3. 长方形面积模型'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // 加载主页面（创建一个导航页面）
  mainWindow.loadFile('index.html');

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 当窗口被关闭时
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 处理页面导航请求
  ipcMain.on('navigate', (event, filename) => {
    if (mainWindow) {
      mainWindow.loadFile(filename);
    }
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 当所有窗口都被关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

