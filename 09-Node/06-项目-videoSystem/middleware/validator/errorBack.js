/**
 * 用户相关校验的错误返回
 */

const { validationResult } = require('express-validator')

module.exports = validations => {
  return async (req, res, next) => {
    // 对传入的规则进行轮询校验
    await Promise.all(validations.map(validation => validation.run(req)))

    // 错误处理
    const err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(401).json({ error: err.array() })
    }

    next()
  }
}