import { ipcMain } from 'electron'
import logger from '../utils/logger'

/**
 * 注册日志相关的IPC处理程序
 */
export function registerLoggerHandlers() {
  ipcMain.handle('logger:info', (_, category, ...args) => {
    logger.info(category, ...args)
    return true
  })

  ipcMain.handle('logger:warn', (_, category, ...args) => {
    logger.warn(category, ...args)
    return true
  })

  ipcMain.handle('logger:error', (_, category, ...args) => {
    logger.error(category, ...args)
    return true
  })

  ipcMain.handle('logger:debug', (_, category, ...args) => {
    logger.debug(category, ...args)
    return true
  })
}