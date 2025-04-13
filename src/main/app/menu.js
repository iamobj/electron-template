import { app, BaseWindow, Menu } from 'electron'

const isMac = process.platform === 'darwin'

// 主菜单模板
export function createMainMenu() {
  const template = [
    // macOS 应用菜单
    ...(isMac
      ? [{
          label: app.name, // 开发环境下，不会显示应用名
          submenu: [
            {
              label: `当前版本：${app.getVersion()}`,
              enabled: false,
            },
            {
              label: '检查更新',
              async click() {
                console.log('检查更新')
              },
            },
            {
              type: 'separator',
            },
            {
              label: '退出',
              accelerator: 'CmdOrCtrl+Q',
              click() {
                app.quit()
              },
            },
          ],
        }]
      : []),
    // 视图菜单
    {
      label: '查看',
      submenu: [
        {
          label: '刷新页面',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            BaseWindow.getFocusedWindow()?.webContents.reload()
          },
        },
      ],
    },
  ]

  return Menu.buildFromTemplate(template)
}
