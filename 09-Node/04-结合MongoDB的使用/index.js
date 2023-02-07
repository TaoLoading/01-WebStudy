const { MongoClient } = require('mongodb')

// 创建实例
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// 连接数据库
const clientFun = async () => {
  await client.connect()
  console.log('连接成功')
  // 数据库名称
  const db = client.db('my_test')
  // 集合名称
  return db.collection('aa')
}

// 增
const addFun = async (cc) => {
  await cc.insertOne({ name: 'vscode1', age: 10 })
  await cc.insertMany([
    { name: 'vscode2', age: 11 },
    { name: 'vscode3', age: 12 },
    { name: 'vscode4', age: 13 },
    { name: 'vscode5', age: 14 },
    { name: 'vscode6', age: 15 },
  ])
  console.log('增加成功')
}

// 删
const deleteFun = async (cc) => {
  await cc.deleteOne({ name: 'vscode3', age: 12 })
  await cc.deleteMany({ age: { $gt: 19 } })
  console.log('删除成功')
}

// 改
const updateFun = async (cc) => {
  await cc.updateOne({ name: 'vscode1' }, { $set: { age: 20 } })
  console.log('修改成功')
}

// 查
const findFun = async (cc) => {
  const allResult = await cc.find()
  console.log(await allResult.toArray())
  const oneResult = await cc.findOne({ age: { $gt: 16 } })
  console.log(await oneResult)
  console.log('查询成功')
}

const main = async () => {
  const cc = await clientFun()
  await addFun(cc)
  await deleteFun(cc)
  await updateFun(cc)
  await findFun(cc)
}

// 结束后断开连接
main()
  .then()
  .catch(console.error)
  .finally(() => client.close())