import { registerLoggerHandlers } from './logger'

/**
 * 注册主进程的IPC处理程序
 */
export function registerIpcHandlers() {
  // 注册日志相关IPC处理
  registerLoggerHandlers()

  // 可以添加更多IPC处理程序
}
