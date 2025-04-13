import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, Menu } from 'electron'
import icon from '../../resources/icon.png?asset'
import { createMainMenu } from './app/menu'
import { createMainWindow } from './app/window'
import { registerIpcHandlers } from './ipcs'

let mainWindow

// 初始化应用
function initApp() {
  // 创建主窗口
  mainWindow = createMainWindow(icon)
}

app.whenReady().then(() => {
  // 设置应用ID
  electronApp.setAppUserModelId('com.iamc.startrade')

  // 监听窗口创建事件
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 初始化应用
  initApp()

  // 设置应用菜单
  Menu.setApplicationMenu(createMainMenu())

  // 注册IPC处理程序
  registerIpcHandlers()

  // macOS 激活应用时的处理
  app.on('activate', () => {
    if (mainWindow === null)
      initApp()
  })
})

// 所有窗口关闭时的处理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
