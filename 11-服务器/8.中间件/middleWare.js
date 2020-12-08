/*
 中间件：
     概念：本质上就是一个函数，包含三个参数：request、response、next

 作用：
        1)	执行任何代码。
        2)	修改请求对象、响应对象。
        3)	终结请求-响应循环。(让一次请求得到响应)
        4)	调用堆栈中的下一个中间件或路由。
  分类：
        1)	应用级中间件（过滤非法的请求，例如防盗链）
              --第一种写法：app.use((request,response,next)=>{})
              --第二种写法：使用函数定义
        2)	第三方中间件，即：不是Node内置的，也不是express内置的（通过npm下载的中间件，例如body-parser）
              --app.use(bodyParser.urlencoded({extended:true}))
        3)	内置中间件（express内部封装好的中间件）
              --app.use(express.urlencoded({extended:true}))
              --app.use(express.static('public')) //暴露静态资源
        4)	路由器中间件 （Router）
              --后面讲
   备注：
        1.在express中，定义路由和中间件的时候，根据定义的顺序（代码的顺序），将定义的每一个中间件或路由，
        放在一个类似于数组的容器中，当请求过来的时候，依次从容器中取出中间件和路由，进行匹配，如果匹配
        成功，交由该路由或中间件处理，如果应用级中间件写在了最开始的位置，那么他就是请求的“第一扇门”。
        2.对于服务器来说，一次请求，只有一个请求对象，和一个响应对象，其他任何的request和response都是对二者的引用。
 */

const express = require('express')

//引入body-parser，用于解析post参数
//const bodyParser = require('body-parser')

const app = express()

//【第一种】使用应用级(全局)中间件------所有请求的第一扇门-------所有请求都要经过某些处理的时候用此种写法
/*app.use((request,response,next)=>{
  //response.send('我是中间件给你的响应')
  //response.test = 1 //修改请求对象
  //图片防盗链
  if(request.get('Referer')){
    let miniReferer = request.get('Referer').split('/')[2]
    if(miniReferer === 'localhost:63347'){
      next()
    }else{
      //发生了盗链
      response.sendFile(__dirname+'/public/err.png')
    }
  }else{
    next()
  }
  //next()
})*/

//【第二种】使用全局中间件的方式------更加灵活，不是第一扇门，可以在任何需要的地方使用。
function guardPic(request, response, next) {
	//防盗链
	if (request.get('Referer')) {
		let miniReferer = request.get('Referer').split('/')[2]
		if (miniReferer === 'localhost:63347') {
			next()
		} else {
			//发生了盗链
			response.sendFile(__dirname + '/public/err.png')
		}
	} else {
		next()
	}
}

//使用第三方中间件bodyParser
//解析post请求请求体中所携带的urlencoded编码形式的参数为一个对象，随后挂载到request对象上
//app.use(bodyParser.urlencoded({extended: true}))

//解析post请求请求体中所携带的urlencoded编码形式的参数为一个对象，随后挂载到request对象上。（express内置了）
app.use(express.urlencoded({ extended: true }))

//使用内置中间件去暴露静态资源 ---- 一次性把你所指定的文件夹内的资源全部交出去。
app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
	console.log(request.demo)
	response.send('ok')
})

app.get('/demo', (request, response) => {
	console.log(request.demo)
	console.log(request.query)
	response.send('ok2')
})

app.get('/picture', guardPic, (request, response) => {
	response.sendFile(__dirname + '/public/demo.jpg')
})

app.post('/test', (request, response) => {
	console.log(request.body)
	response.send('ok')
})

app.listen(3000, function (err) {
	if (!err) console.log('ok')
	else console.log(err)
})
