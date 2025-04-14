import fs from 'node:fs'
import path from 'node:path'
import { app } from 'electron'
import log from 'electron-log'
import { ensureDirSync } from './fs'

const loggers = {}

const DEFAULT_MAX_SIZE = 20 * 1024 * 1024 // 20MB
const DEFAULT_KEEP_DAYS = 60 // 日志保留60天

/**
 * 自动清理日志文件
 * @param {string} category
 * @param {number} keepDays
 */
function cleanOldLogs(category, keepDays = DEFAULT_KEEP_DAYS) {
  try {
    const logsDir = path.join(app.getPath('userData'), 'logs', category)
    if (!fs.existsSync(logsDir))
      return
    const files = fs.readdirSync(logsDir)
    const expire = Date.now() - keepDays * 24 * 3600 * 1000
    files.forEach((file) => {
      const filePath = path.join(logsDir, file)
      try {
        const stat = fs.statSync(filePath)
        if (!stat.isFile())
          return
        if (stat.mtimeMs < expire)
          fs.unlinkSync(filePath)
      }
      catch {}
    })
  }
  catch {
    // 单独不抛异常
  }
}

/**
 * 获取/创建指定类别的日志实例
 * @param {string} category 日志类型(如：main/business/audit)
 * @param {object} opts { maxSize, keepDays }
 */
function getLogger(category = 'main', opts = {}) {
  if (loggers[category])
    return loggers[category]
  const logger = log.create({
    logId: category,
  })
  const logsDir = path.join(app.getPath('userData'), 'logs', category)
  ensureDirSync(logsDir)

  logger.transports.file.resolvePathFn = () => {
    const date = new Date().toISOString().substring(0, 10)
    return path.join(logsDir, `${date}.${category}.log`)
  }
  logger.transports.file.maxSize = opts.maxSize || DEFAULT_MAX_SIZE
  logger.transports.file.level = process.env.NODE_ENV === 'development' ? 'debug' : 'info'
  logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}'
  logger.transports.file.archiveLogFn = (oldPath) => {
    const ts = Date.now()
    const archivePath = `${oldPath.replace('.log', '')}.${ts}.back.log`
    return { newPath: archivePath }
  }
  // 每次创建/切换新日期日志自动清理
  cleanOldLogs(category, opts.keepDays || DEFAULT_KEEP_DAYS)

  loggers[category] = logger
  return logger
}

/**
 * 日志工具
 * @example
 * logger.info('main', '主进程启动')
 * logger.info('business', '业务日志')
 * const businessLogger = logger.getLogger('business')
 * businessLogger.info('业务日志')
 * businessLogger.warn('业务警告')
 */
const logger = {
  getLogger, // getLogger('business')
  info(category, ...args) { getLogger(category).info(...args) },
  warn(category, ...args) { getLogger(category).warn(...args) },
  error(category, ...args) { getLogger(category).error(...args) },
  debug(category, ...args) { getLogger(category).debug(...args) },

  // 可选：支持手动全量清理（如按需开发面板操作）
  cleanAll(keepDays = DEFAULT_KEEP_DAYS) {
    Object.keys(loggers).forEach(category => cleanOldLogs(category, keepDays))
  },
}

export default logger
