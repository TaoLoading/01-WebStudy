/**
 * 基础演示
 */

const jwt = require('jsonwebtoken')

// 生成token
const token = jwt.sign({ foo: 'hello' }, 'taoloading')
console.log('token:', token)

// 校验token
const info = jwt.verify(token, 'taoloading')
console.log('info:', info)