/**
 * 用户相关校验规则
 */

const { body } = require('express-validator')
const errorBack = require('./errorBack')

module.exports.register = errorBack([
  body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({ min: 3 }).withMessage('用户名不能小于3个字符'),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
    .isLength({ min: 6 }).withMessage('密码不能小于3个字符'),
  body('phone')
    .notEmpty().withMessage('电话不能为空'),
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('输入的邮箱格式不正确'),
])