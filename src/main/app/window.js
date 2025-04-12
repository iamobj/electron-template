import { join } from 'node:path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, globalShortcut, shell } from 'electron'
import { mainWindowConstants } from '../../common/configs/constants'

export function createMainWindow(icon) {
  const height = is.dev ? 700 : mainWindowConstants.height
  const mainWindow = new BrowserWindow({
    width: mainWindowConstants.width,
    height,
    minWidth: mainWindowConstants.width,
    minHeight: height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)', // 控制按钮区域背景颜色（CSS 颜色）。这里设置为透明色。（仅 Windows）
      symbolColor: 'white', // 控制按钮颜色（CSS 颜色）。如果你想要暗色背景，那么这里应该设置为亮色，反之亦然。（仅 Windows）
      height: mainWindowConstants.titleHeight, // 控制按钮高度（单位 px）。不宜太小，这里设置为 35 是比较合适的。（Windows、MacOS）
    },
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      webSecurity: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 拒绝window.open打开外部链接
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
    // 注册快捷键 打开开发者工具
    globalShortcut.register('CommandOrControl+Shift+I', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    })
  }
  else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}
