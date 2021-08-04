const express = require('express')
const cors = require('cors')

const app = express()

// 使用cors, 允许跨域
app.use(cors())
// 能解析urlencode格式的post请求体参数
app.use(express.urlencoded())
// 能解析json格式的请求体参数
app.use(express.json())

const posts = [
  {
    "title": "json-server",
    "author": "typicode",
    "id": 1
  },
  {
    "title": "json-server3",
    "author": "typicode3",
    "id": 3
  }
]

app.get('/getPosts', (req, res) => {
  res.send({status: 0, data: posts})
})

app.post('/addPost', (req, res) => {
  const {title, author} = req.body
  const id = Date.now()
  const post = {title, author, id}
  posts.push(post)
  res.send({status: 0, data: post})
})

app.put('/updatePost', (req, res) => {
  const {title, author, id} = req.body
  const post = posts.find(post => post.id==id)
  post.title = title
  post.author = author
  res.send({status: 0})
})

app.delete('/deletePost', (req, res) => {
  const {id} = req.query
  const index = posts.findIndex(post => post.id==id)
  const postArr = posts.splice(index, 1)
  res.send({status: 0, data: postArr})
})


app.get('/getProducts1', (req, res) => {
  
  setTimeout(() => {
    res.send([
      {id: 1, name: 'product1.1'},
      {id: 2, name: 'product1.2'},
      {id: 3, name: 'product1.3'}
    ])
  }, 1000 + Math.random()*2000);
  
})

app.get('/getProducts2', (req, res) => {

  setTimeout(() => {
    res.send([{
        id: 1,
        name: 'product2.1'
      },
      {
        id: 2,
        name: 'product2.2'
      },
      {
        id: 3,
        name: 'product2.3'
      }
    ])
  }, 1000 + Math.random() * 2000);

})

app.listen(4000, () => {
  console.log('server app start on port 4000')
})