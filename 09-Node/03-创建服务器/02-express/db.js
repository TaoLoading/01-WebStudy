/**
 * 操作数据
 */

const fs = require('fs')
const { promisify } = require('util')

// 将读写操作 promise 化，用于避免产生回调地狱
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

exports.getData = async () => {
  const data = await readFile(__dirname + '/db.json', 'utf-8')
  return JSON.parse(data)
}

exports.writeData = async (data) => {
  return await writeFile(__dirname + '/db.json', JSON.stringify(data))
}