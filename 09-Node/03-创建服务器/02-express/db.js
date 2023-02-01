const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
exports.getDb = async () => {
  let data = await readFile('./db.json', 'utf8')
  return JSON.parse(data)
}

exports.serveDb = async (data) => {
  let stringData = JSON.stringify(data)
  return await writeFile('./db.json', stringData)

}