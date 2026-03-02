/**
 * 安全验证工具模块
 * 提供路径安全检查、文件类型验证、内容验证等功能
 */

// ==================== 文件类型配置 ====================

/** 允许的文件类型白名单 */
export const FILE_WHITELIST = {
  // 网页文件
  webPages: ['.html', '.htm'],
  // 样式文件
  styles: ['.css', '.scss', '.sass', '.less'],
  // 脚本文件
  scripts: ['.js', '.ts'],
  // 配置文件
  configs: ['.json', '.xml', '.yml', '.yaml'],
  // 图片文件
  images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'],
  // 字体文件
  fonts: ['.ttf', '.otf', '.woff', '.woff2', '.eot'],
  // 文档文件
  documents: ['.md', '.txt'],
  // 压缩文件（用于构建优化）
  compressed: ['.gz', '.br'],
}

/** 获取所有白名单扩展名 */
export const getAllowedExtensions = (): string[] => {
  return Object.values(FILE_WHITELIST).flat()
}

/** 严格禁止的文件类型黑名单 */
export const FILE_BLACKLIST = {
  // 可执行文件
  executables: ['.exe', '.bat', '.sh', '.cmd', '.com'],
  // 服务器脚本
  serverScripts: ['.php', '.asp', '.jsp', '.py', '.rb'],
  // 系统文件
  systemFiles: ['.dll', '.so', '.dylib'],
  // 归档文件
  archives: ['.zip', '.rar', '.tar', '.7z'],
}

/** 获取所有黑名单扩展名 */
export const getBlockedExtensions = (): string[] => {
  return Object.values(FILE_BLACKLIST).flat()
}

/** 需要跳过的系统文件模式 */
export const SYSTEM_FILE_PATTERNS = ['__MACOSX/', '._', '.DS_Store', 'Thumbs.db']

// ==================== 验证结果类型 ====================

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export interface PathValidationResult extends ValidationResult {
  normalizedPath?: string
}

export interface FileTypeValidationResult extends ValidationResult {
  fileType?: string
  category?: string
}

export interface HtmlValidationResult extends ValidationResult {
  hasDoctype: boolean
  hasHtmlTag: boolean
  hasHeadTag: boolean
  hasBodyTag: boolean
}

// ==================== 路径安全检查 ====================

/**
 * 检查路径是否包含路径遍历攻击
 * @param path 要检查的路径
 * @returns 是否包含路径遍历
 */
export const hasPathTraversal = (path: string): boolean => {
  // 检查 ../ 和 ..\\ 模式
  const traversalPatterns = [
    /\.\.\//g, // ../
    /\.\.\\/g, // ..\\
    /\.\.$/g, // 路径末尾的 ..
  ]

  return traversalPatterns.some((pattern) => pattern.test(path))
}

/**
 * 检查是否为绝对路径
 * @param path 要检查的路径
 * @returns 是否为绝对路径
 */
export const isAbsolutePath = (path: string): boolean => {
  // Windows 绝对路径: C:\, D:\, etc.
  const windowsAbsolute = /^[a-zA-Z]:[/\\]/
  // Unix 绝对路径: /
  const unixAbsolute = /^[/\\]/

  return windowsAbsolute.test(path) || unixAbsolute.test(path)
}

/**
 * 检查路径是否超出基础目录
 * @param basePath 基础目录路径
 * @param targetPath 目标路径
 * @returns 是否超出基础目录
 */
export const isOutsideBaseDir = (basePath: string, targetPath: string): boolean => {
  // 规范化路径
  const normalizedBase = normalizePath(basePath)
  const normalizedTarget = normalizePath(targetPath)

  // 解析相对路径
  const resolvedPath = resolvePath(normalizedBase, normalizedTarget)

  // 检查解析后的路径是否仍在基础目录内
  return !resolvedPath.startsWith(normalizedBase)
}

/**
 * 检查是否为系统文件（应跳过）
 * @param path 文件路径
 * @returns 是否为系统文件
 */
export const isSystemFile = (path: string): boolean => {
  const fileName = getFileName(path)

  return SYSTEM_FILE_PATTERNS.some((pattern) => {
    if (pattern.endsWith('/')) {
      // 目录模式
      return path.includes(pattern)
    }
    // 文件前缀模式
    return fileName.startsWith(pattern)
  })
}

/**
 * 规范化路径（统一分隔符）
 * @param path 原始路径
 * @returns 规范化后的路径
 */
export const normalizePath = (path: string): string => {
  return path.replace(/\\/g, '/').replace(/\/+/g, '/')
}

/**
 * 解析相对路径
 * @param basePath 基础路径
 * @param relativePath 相对路径
 * @returns 解析后的完整路径
 */
export const resolvePath = (basePath: string, relativePath: string): string => {
  const parts = [...basePath.split('/').filter(Boolean), ...relativePath.split('/').filter(Boolean)]

  const resolved: string[] = []

  for (const part of parts) {
    if (part === '..') {
      resolved.pop()
    } else if (part !== '.') {
      resolved.push(part)
    }
  }

  return '/' + resolved.join('/')
}

/**
 * 获取文件名
 * @param path 文件路径
 * @returns 文件名
 */
export const getFileName = (path: string): string => {
  const normalized = normalizePath(path)
  const parts = normalized.split('/')
  return parts[parts.length - 1] || ''
}

/**
 * 完整的路径安全验证
 * @param path 要验证的路径
 * @param baseDir 基础目录（可选）
 * @returns 验证结果
 */
export const validatePath = (path: string, baseDir?: string): PathValidationResult => {
  const result: PathValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  }

  // 1. 检查路径遍历
  if (hasPathTraversal(path)) {
    result.valid = false
    result.errors.push('路径包含禁止的遍历模式（../ 或 ..\\）')
  }

  // 2. 检查绝对路径
  if (isAbsolutePath(path)) {
    result.valid = false
    result.errors.push('禁止使用绝对路径')
  }

  // 3. 检查是否超出基础目录
  if (baseDir && isOutsideBaseDir(baseDir, path)) {
    result.valid = false
    result.errors.push('路径超出允许的目录范围')
  }

  // 4. 检查系统文件
  if (isSystemFile(path)) {
    result.warnings.push('检测到系统文件，将自动跳过')
  }

  // 5. 添加规范化后的路径
  if (result.valid) {
    result.normalizedPath = normalizePath(path)
  }

  return result
}

// ==================== 文件类型验证 ====================

/**
 * 获取文件扩展名
 * @param fileName 文件名
 * @returns 扩展名（小写）
 */
export const getFileExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.')
  if (lastDot === -1 || lastDot === 0) {
    return ''
  }
  return fileName.slice(lastDot).toLowerCase()
}

/**
 * 检查文件类型是否在白名单中
 * @param fileName 文件名
 * @returns 是否允许
 */
export const isAllowedFileType = (fileName: string): boolean => {
  const ext = getFileExtension(fileName)
  return getAllowedExtensions().includes(ext)
}

/**
 * 检查文件类型是否在黑名单中
 * @param fileName 文件名
 * @returns 是否禁止
 */
export const isBlockedFileType = (fileName: string): boolean => {
  const ext = getFileExtension(fileName)
  return getBlockedExtensions().includes(ext)
}

/**
 * 获取文件类型分类
 * @param fileName 文件名
 * @returns 分类名称或 undefined
 */
export const getFileTypeCategory = (fileName: string): string | undefined => {
  const ext = getFileExtension(fileName)

  for (const [category, extensions] of Object.entries(FILE_WHITELIST)) {
    if (extensions.includes(ext)) {
      return category
    }
  }

  return undefined
}

/**
 * 完整的文件类型验证
 * @param fileName 文件名
 * @returns 验证结果
 */
export const validateFileType = (fileName: string): FileTypeValidationResult => {
  const result: FileTypeValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  }

  const ext = getFileExtension(fileName)
  result.fileType = ext

  // 1. 检查黑名单（优先级最高）
  if (isBlockedFileType(fileName)) {
    result.valid = false
    result.errors.push(`文件类型 ${ext} 在黑名单中，严格禁止`)
    return result
  }

  // 2. 检查白名单
  if (!isAllowedFileType(fileName)) {
    result.valid = false
    result.errors.push(`文件类型 ${ext} 不在允许的白名单中`)
    return result
  }

  // 3. 获取分类
  result.category = getFileTypeCategory(fileName)

  return result
}

// ==================== HTML 内容验证 ====================

/**
 * 验证 HTML 文件内容
 * @param content HTML 文件内容
 * @param fileName 文件名（用于特殊规则判断）
 * @returns 验证结果
 */
export const validateHtmlContent = (content: string, fileName?: string): HtmlValidationResult => {
  const result: HtmlValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    hasDoctype: false,
    hasHtmlTag: false,
    hasHeadTag: false,
    hasBodyTag: false,
  }

  // 检查内容是否为空
  if (!content || content.trim().length === 0) {
    result.valid = false
    result.errors.push('HTML 文件内容不能为空')
    return result
  }

  // 检查 DOCTYPE
  result.hasDoctype = /<!doctype\s+html>/i.test(content)

  // 检查 <html> 标签
  result.hasHtmlTag = /<html[\s>]/i.test(content)

  // 检查 <head> 标签
  result.hasHeadTag = /<head[\s>]/i.test(content)

  // 检查 <body> 标签
  result.hasBodyTag = /<body[\s>]/i.test(content)

  // 对于 index.html，执行更严格的验证
  const isIndexHtml = fileName?.toLowerCase() === 'index.html'

  if (isIndexHtml) {
    // index.html 必须包含基本 HTML 结构
    if (!result.hasDoctype && !result.hasHtmlTag) {
      result.valid = false
      result.errors.push('index.html 必须包含 <!DOCTYPE html> 或 <html> 标签')
    }

    if (!result.hasHeadTag) {
      result.valid = false
      result.errors.push('index.html 必须包含 <head> 标签')
    }

    if (!result.hasBodyTag) {
      result.valid = false
      result.errors.push('index.html 必须包含 <body> 标签')
    }
  } else {
    // 非 index.html 文件，给出警告而非错误
    if (!result.hasDoctype && !result.hasHtmlTag) {
      result.warnings.push('建议包含 <!DOCTYPE html> 或 <html> 标签')
    }

    if (!result.hasHeadTag) {
      result.warnings.push('建议包含 <head> 标签')
    }

    if (!result.hasBodyTag) {
      result.warnings.push('建议包含 <body> 标签')
    }
  }

  return result
}

// ==================== 综合验证函数 ====================

export interface FileValidationOptions {
  /** 基础目录路径 */
  baseDir?: string
  /** 是否验证 HTML 内容 */
  validateHtml?: boolean
  /** HTML 文件内容（当 validateHtml 为 true 时需要） */
  htmlContent?: string
}

export interface FileValidationResult extends ValidationResult {
  pathValidation?: PathValidationResult
  fileTypeValidation?: FileTypeValidationResult
  htmlValidation?: HtmlValidationResult
}

/**
 * 综合文件验证
 * @param filePath 文件路径
 * @param options 验证选项
 * @returns 综合验证结果
 */
export const validateFile = (filePath: string, options: FileValidationOptions = {}): FileValidationResult => {
  const result: FileValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  }

  // 1. 路径安全验证
  const pathResult = validatePath(filePath, options.baseDir)
  result.pathValidation = pathResult

  if (!pathResult.valid) {
    result.valid = false
    result.errors.push(...pathResult.errors)
  }
  result.warnings.push(...pathResult.warnings)

  // 如果是系统文件，直接返回（跳过后续验证）
  if (isSystemFile(filePath)) {
    result.valid = false
    result.warnings.push('系统文件将被跳过')
    return result
  }

  // 2. 文件类型验证
  const fileName = getFileName(filePath)
  const fileTypeResult = validateFileType(fileName)
  result.fileTypeValidation = fileTypeResult

  if (!fileTypeResult.valid) {
    result.valid = false
    result.errors.push(...fileTypeResult.errors)
  }
  result.warnings.push(...fileTypeResult.warnings)

  // 3. HTML 内容验证（如果需要）
  const ext = getFileExtension(fileName)
  if (options.validateHtml && FILE_WHITELIST.webPages.includes(ext) && options.htmlContent) {
    const htmlResult = validateHtmlContent(options.htmlContent, fileName)
    result.htmlValidation = htmlResult

    if (!htmlResult.valid) {
      result.valid = false
      result.errors.push(...htmlResult.errors)
    }
    result.warnings.push(...htmlResult.warnings)
  }

  return result
}

/**
 * 批量验证文件
 * @param files 文件列表 [{ path: string, content?: string }]
 * @param baseDir 基础目录
 * @returns 验证结果映射
 */
export const validateFiles = (
  files: Array<{ path: string; content?: string }>,
  baseDir?: string
): Map<string, FileValidationResult> => {
  const results = new Map<string, FileValidationResult>()

  for (const file of files) {
    const ext = getFileExtension(file.path)
    const isHtml = FILE_WHITELIST.webPages.includes(ext)

    const result = validateFile(file.path, {
      baseDir,
      validateHtml: isHtml && !!file.content,
      htmlContent: file.content,
    })

    results.set(file.path, result)
  }

  return results
}

// ==================== 工具函数 ====================

/**
 * 过滤出安全的文件列表
 * @param files 文件路径列表
 * @param baseDir 基础目录
 * @returns 安全的文件路径列表
 */
export const filterSafeFiles = (files: string[], baseDir?: string): string[] => {
  return files.filter((file) => {
    // 跳过系统文件
    if (isSystemFile(file)) {
      return false
    }

    const result = validateFile(file, { baseDir })
    return result.valid
  })
}

/**
 * 格式化验证结果为可读字符串
 * @param result 验证结果
 * @returns 格式化后的字符串
 */
export const formatValidationResult = (result: ValidationResult): string => {
  const lines: string[] = []

  lines.push(`验证结果: ${result.valid ? '✅ 通过' : '❌ 失败'}`)

  if (result.errors.length > 0) {
    lines.push('\n错误:')
    result.errors.forEach((error) => lines.push(`  - ${error}`))
  }

  if (result.warnings.length > 0) {
    lines.push('\n警告:')
    result.warnings.forEach((warning) => lines.push(`  - ${warning}`))
  }

  return lines.join('\n')
}
