// 引入css(使用ES6模块化语法)
import './test.css'
// 引入图片(实际上引入的是路径)
import logo from './logo.jpg'

// 普通js示例
console.log('Hello Webpack!')
document.getElementById('root').innerHTML = '<h1>Hello222</h1>'

// ES6语法示例
const fn = () => {
	console.log('ok')
}

// 图片示例
const image = new Image()
image.src = logo
document.getElementById('root').appendChild(image)
