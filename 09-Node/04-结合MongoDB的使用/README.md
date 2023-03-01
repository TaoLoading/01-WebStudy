## MongoDB学习

### 原生node操作数据库：
1. 创建MongoClient实例
    ```javascript
    const url = 'mongodb://localhost:27017'
    const client = new MongoClient(url)
    ```
2. 连接数据库
    ```javascript
    const clientFun = async () => {
      await client.connect()
      console.log('连接成功')
      // 数据库名称
      const db = client.db('my_test')
      // 集合名称
      return db.collection('aa')
    }
    ```
3. 增删改查操作，具体见代码
    ```javascript
    const main = async () => {
      const cc = await clientFun()
      await addFun(cc)
      await deleteFun(cc)
      await updateFun(cc)
      await findFun(cc)
    }
    ```
4. 操作完毕后断开连接
    ```javascript
    main()
      .then()
      .catch(console.error)
      .finally(() => client.close())
    ```

### 使用mongoose操作数据库：
1. 引用mongoose并连接数据库
    ```javascript
    const mongoose = require('mongoose')
    
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/test')
    ```
2. 创建模型
    ```javascript
    const user = new mongoose.Schema({
      username: {
        type: String,
        require: true
      },
      age: {
        type: String,
        require: true
      }
    })
    ```
3. 创建集合
    ```javascript
    const userModel = mongoose.model('User', user)
    ```
4. 添加数据
```javascript
const u = new userModel({ username: 'test01', age: 18 })
```
5. 保存
```javascript
u.save()
```