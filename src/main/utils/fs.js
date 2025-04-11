import fs from 'node:fs'

/**
 * 同步确保目录存在，如果目录不存在则创建
 * @param {string} p - 目录路径
 * @returns {void}
 */
export function ensureDirSync(p) {
  if (!fs.existsSync(p))
    fs.mkdirSync(p, { recursive: true })
}
