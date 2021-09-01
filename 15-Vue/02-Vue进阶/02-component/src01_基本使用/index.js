// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入HelloWorld组件
import HelloWorld from './components/HelloWrold.vue'

// 全局注册组件
// Vue.component('HelloWorld', HelloWorld)

// 方式一(使用render)
new Vue({
	el: '#root',
	// 调用render函数得到它返回的组件标签对象
	render: function(createElement) {
		// 用来渲染组件标签的回调函数
		return createElement(App)
	},
})

// 方式二(使用template)
// new Vue({
// 	el: '#root',
// 	components: {
// 		App,
// 	},
// 	template: '<App/>',
// })

/* 
render：可以正常使用
    原因：内部使用vue-template-compliler提前编译好了模板
templa：不能正常使用
    原因：内部没有使用vue-template-compliler
    解决：添加'vue$': 'vue/dist/vue.esm.js'，让webpack打包引入带编译器的版本
总结：render更好，优点：1.编码简洁  2.打包文件小(通过调试工具中的Network查看)
*/
