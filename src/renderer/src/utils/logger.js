/**
 * 渲染进程日志工具
 * 通过IPC调用主进程的日志功能
 */

/**
 * 获取日志实例
 * @param {string} category 日志类别
 * @returns {Object} 日志实例
 */
export function getLogger(category = 'renderer') {
  return {
    info: (...args) => window.electron.ipcRenderer.invoke('logger:info', category, ...args),
    warn: (...args) => window.electron.ipcRenderer.invoke('logger:warn', category, ...args),
    error: (...args) => window.electron.ipcRenderer.invoke('logger:error', category, ...args),
    debug: (...args) => window.electron.ipcRenderer.invoke('logger:debug', category, ...args)
  }
}

/**
 * 默认日志工具
 */
const logger = {
  getLogger,
  info: (category, ...args) => window.electron.ipcRenderer.invoke('logger:info', category, ...args),
  warn: (category, ...args) => window.electron.ipcRenderer.invoke('logger:warn', category, ...args),
  error: (category, ...args) => window.electron.ipcRenderer.invoke('logger:error', category, ...args),
  debug: (category, ...args) => window.electron.ipcRenderer.invoke('logger:debug', category, ...args)
}

export default logger