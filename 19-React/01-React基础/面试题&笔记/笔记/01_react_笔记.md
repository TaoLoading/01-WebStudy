# 1. React入门
	## 1.1. React基本认识
	## 1.2. React基本使用
	## 1.3. JSX的理解和使用
	## 1.4. 模块与模块化, 组件与组件化的理解

# 2. React组件化编程
	## 2.1. 组件的定义与使用
	## 2.2. 组件的3大属性: state, props, refs
	## 2.3. 组件中的事件处理
	## 2.4. 组件的组合使用
	## 2.5. 组件收集表单数据
	## 2.6. 组件的生命周期
	## 2.7. 虚拟DOM与DOM diff算法
	## 2.8. 命令式编程与声明式编程


# 1. React入门
## 1.1. React的基本认识
	1). Facebook开源的一个js库
	2). 一个用来动态构建用户界面的js库
	3). React的特点
		Declarative(声明式编码)
		Component-Based(组件化编码)
		Learn Once, Write Anywhere(支持客户端与服务器渲染)
		高效
		单向数据流
	4). React高效的原因
    	虚拟(virtual)DOM, 不总是直接操作DOM(批量更新, 减少更新的次数) 
    	高效的DOM Diff算法, 最小化页面重绘(减小页面更新的区域)

## 1.2. React的基本使用
	1). 导入相关js库文件(react.js, react-dom.js, babel.min.js)
	2). 编码:
		<div id="container"></div>
		<script type="text/babel">
			var aa = 123#  #
			var bb = 'test'
			ReactDOM.render(<h1 id={bb}>{aa}</h1>, containerDOM)
		</script>

## 1.3. JSX的理解和使用
	1). 理解
		* 全称: JavaScript XML
		* react定义的一种类似于XML的JS扩展语法: XML+JS
		* 作用: 用来创建react虚拟DOM(元素)对象
	2). 编码相关
		* js中直接可以套标签, 但标签要套js需要放在{}中
		* 在解析显示js数组时, 会自动遍历显示
		* 把数据的数组转换为标签的数组: 
			var liArr = dataArr.map(function(item, index){
				return <li key={index}>{item}</li>
			})
	3). 注意:
	    * 标签必须有结束
	    * 标签的class属性必须改为className属性
	    * 标签的style属性值必须为: {{color:'red', width:12}}


## 1.4. 几个重要概念理解
### 1). 模块与组件
	1. 模块:
	  	理解: 向外提供特定功能的js程序, 一般就是一个js文件
	  	为什么: js代码更多更复杂
	  	作用: 复用js, 简化js的编写, 提高js运行效率
	2. 组件: 
		理解: 用来实现特定界面功能效果的代码集合(html/css/js/img)
	  	为什么: 一个界面的功能太复杂了
	  	作用: 复用编码, 简化项目界面编码, 提高运行效率
### 2). 模块化与组件化
    1. 模块化:
    	当应用的js都以模块来编写的, 这个应用就是一个模块化的应用
    2. 组件化:
    	当应用是以多组件的方式实现功能, 这上应用就是一个组件化的应用


# 2. react组件化开发
## 2.1. 基本理解和使用
	1). 自定义的标签: 组件类(函数)/标签
	2). 创建组件类
		//方式1: 无状态函数(简单组件, 推荐使用)
		function MyComponent1(props) {
			return <h1>自定义组件标题11111</h1>
		}
		//方式2: ES6类语法(复杂组件, 推荐使用)
		class MyComponent3 extends React.Component {
			render () {
			  return <h1>自定义组件标题33333</h1>
			}
		}
	3). 渲染组件标签
		ReactDOM.render(<MyComp />,  cotainerEle)
	4). ReactDOM.render()渲染组件标签的基本流程
		React内部会创建组件实例对象/调用组件函数, 得到虚拟DOM对象
		将虚拟DOM并解析为真实DOM
		插入到指定的页面元素内部

## 2.2. 组件的3大属性: state
	1. 组件被称为"状态机", 页面的显示是根据组件的state属性的数据来显示
	2. 初始化指定:
        constructor() {
          super()
          this.state = {
            stateName1 : stateValue1,
            stateName2 : stateValue2
          }
        }
	3. 读取显示: 
	    this.state.stateName1
	4. 更新状态-->更新界面 : 
	    this.setState({stateName1 : newValue})

## 2.2. 组件的3大属性: props
	所有组件标签的属性的集合对象
	给标签指定属性, 保存外部数据(可能是一个function)
	在组件内部读取属性: this.props.propertyName
	作用: 从目标组件外部向组件内部传递数据
	对props中的属性值进行类型限制和必要性限制
		Person.propTypes = {
			name: React.PropTypes.string.isRequired,
			age: React.PropTypes.number.isRequired
		}
	扩展属性: 将对象的所有属性通过props传递
	    <Person {...person}/>

## 2.2. 组件的3大属性: refs
	组件内包含ref属性的标签元素的集合对象
	给操作目标标签指定ref属性, 打一个标识
	在组件内部获得标签对象: this.refs.refName(只是得到了标签元素对象)
	作用: 找到组件内部的真实dom元素对象, 进而操作它

## 2.3. 组件中的事件处理
	1. 给标签添加属性: onXxx={this.eventHandler}
	2. 在组件中添加事件处理方法
	    eventHandler = (event) => {
	                
	    }
	3. 使自定义方法中的this为组件对象
	  	在constructor()中bind(this)
	  	使用箭头函数定义方法
	4. 事件监听
		绑定事件监听
			事件名
			回调函数
		触发事件
			用户对对应的界面做对应的操作
			编码

## 2.4. 组件的组合使用
	1)拆分组件: 拆分界面,抽取组件
	2)实现静态组件: 使用组件实现静态页面效果
	3)实现动态组件
		①　动态显示初始化数据
		②　交互功能(从绑定事件监听开始)

## 2.5. 组件收集表单数据
	受控组件: 输入过程中自动收集数据
    非受控组件: 提交时手动读取数据

## 2.6. 组件的生命周期
	1. 组件的三个生命周期状态:
		Mount：插入真实 DOM
		Update：被重新渲染
		Unmount：被移出真实 DOM
	2. 生命周期流程:
		* 第一次初始化显示: ReactDOM.render(<Xxx/>, containDom)
			constructor()
			componentWillMount() : 将要插入回调
			render() : 用于插入虚拟DOM回调
			componentDidMount() : 已经插入回调
		* 每次更新state: this.setState({})
		    componentWillReceiveProps(): 接收父组件新的属性
		    componentWillUpdate() : 将要更新回调
		    render() : 更新(重新渲染)
		    componentDidUpdate() : 已经更新回调
		* 删除组件: ReactDOM.unmountComponentAtNode(div): 移除组件
			componentWillUnmount() : 组件将要被移除回调
	3. 常用的方法
		render(): 必须重写, 返回一个自定义的虚拟DOM
	  	constructor(): 初始化状态(state={}), 绑定this(可以箭头函数代替)
	  	componentDidMount() : 只执行一次, 已经在dom树中, 适合启动/设置一些监听
![](https://i.imgur.com/8TQ6GUK.png)


## 2.7. 虚拟DOM与DOM diff算法
### 1). 虚拟DOM是什么?
	一个虚拟DOM(元素)是一个一般的js对象, 准确的说是一个对象树(倒立的)
	虚拟DOM保存了真实DOM的层次关系和一些基本属性，与真实DOM一一对应
	如果只是更新虚拟DOM, 页面是不会重绘的
### 2). Virtual DOM 算法的基本步骤
	用JS对象树表示DOM树的结构；然后用这个树构建一个真正的DOM树插到文档当中
	当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
	把差异应用到真实DOM树上，视图就更新了
### 3). 进一步理解
    Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。
    可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。
![](http://i.imgur.com/psaZdqN.png)


## 2.8. 命令式编程与声明式编程
	声明式编程
		只关注做什么, 而不关注怎么做(流程),  类似于填空题
	命令式编程
		要关注做什么和怎么做(流程), 类似于问答题
	
	var arr = [1, 3, 5, 7]
	// 需求: 得到一个新的数组, 数组中每个元素都比arr中对应的元素大10: [11, 13, 15, 17]
	// 命令式编程
	var arr2 = []
	for(var i =0;i<arr.length;i++) {
		arr2.push(arr[i]+10)
	}
	console.log(arr2)
	// 声明式编程
	var arr3 = arr.map(function(item){
		return item +10
	})
	// 声明式编程是建立命令式编程的基础上
	
	// 数组中常见声明式方法
		map() / forEach() / find() / findIndex()