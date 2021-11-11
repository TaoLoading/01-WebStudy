##React面试题：
###1.说说你对React的基本理解
   动态构建用户界面的JS库

###2.React的特点
   1. Declarative(声明式编码)
   2. Component-Based(组件化编码)
   3. 高效
   
###3.React高效的原因
   1. 虚拟(virtual)DOM, 不总是直接操作真实DOM(批量更新, 减少更新的次数) 
   2. 高效的DOM Diff算法, 最小化DOM更新

###4.说说react的jsx
1. JSX 是一个看起来很像 XML 的 js 语法扩展
2. 作用: 简化创建虚拟DOM的语法
3. 浏览器不能直接运行, 需要使用babel转换成纯JS语法: React.createElement()
5. 注意: JSX标签必须有结束；组件标签首字母必须大写；必须只有一个根标签；

###5.说说你对模块与模块化, 组件与组件化的理解？
1. 模块: 具有特定功能的js文件。
1. 模块化: 如果项目的JS编写是以多模块编写组合使用的, 那这个项目就是一个模块化的项目, 也就是模块化的编码方式。
1. 组件: 实现局部功能界面的所有代码的集合。
1. 组件化: 如果项目的功能界面是由多个组件组合编写实现的, 那这个项目就是一个组件化的项目, 也就是组件的编码方式。

###6.定义组件的2种方式？
1. 方式1: 工厂函数(简单/无状态组件)

	   function MyComponent1(props) {
	      return <h1>自定义组件标题11111</h1>
	   }
		ReactDOM.render(<MyComponent1/>, domContainer)
2. 方式2: ES6类(复杂/有状态组件)

	   class MyComponent2 extends React.Component {
	      render () { // 回调函数, 为组件对象提供虚拟DOM
	        return <h1>自定义内容</h1>
	      }
	   }
		ReactDOM.render(<MyComponent2/>, domContainer)

###7.说说类组件、工厂函数式组件的区别？
1. 类组件: 使用class定义的组件, 会产生组件对象, 可以有自身的状态和生命周期勾子
2. 函数组件: 使用function定义的组件, 不会产生组件对象, 没有自身的状态和生命周期勾子
3. 区别组件对象的3大属性
4. state: 值为容器对象, 保存的是组件内可变的数据,组件根据state中的数据显示, 要更新界面只要更新state即可 
5. props: 值为容器对象, 保存的是从组件外传递过来的数据, 当前组件只读, 父组件修改了自动显示新数据
6. refs: 值为容器对象, 保存的是n个有ref属性的dom元素对象, 属性名是ref指定的标识名称, 值为对应的dom元素


###8.React组件化编码的3步与2个重要问题
**编码的3步：**

	   1.拆分组件
	   2.实现静态组件
	   3.实现动态组件：
		  a.动态显示初始化数据
		     1.类型
		     2.名称
		     3.保存在哪个组件
		  b.交互

**2个重要问题：**

	   1). 状态数据保存在哪个组件?  看是某个组件需要, 还是某些组件需要(给父组件)
	   2). 更新状态数据的行为在哪个组件? 状态在哪个组件, 行为就定义在哪个组件

###9.为什么虚拟dom会提高性能?
虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。
具体实现步骤如下：
1. 用 JavaScript 对象结构表示 DOM 树的结构
2. 然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。
3. 然后用新的树和旧的树进行比较，记录两棵树差异把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。


###10.调用 setState 之后发生了什么？
1. React 会将传入的参数对象与组件当前的状态合并产生了新的state
2. 生成新的虚拟DOM树  ==> render()
3. 计算出新树与老树的节点差异，然后做真实DOM的差异更新

###11.react组件的生命周期及勾子
一、初始化阶段：ReactDOM.render(<Xxx/>, containDom)

	   constructor(): 创建组件对象的初始化方法
	   componentWillMount：组件即将被装载、渲染到页面上
	   render:组件在这里生成虚拟的DOM节点
	   componentDidMount:组件真正在被装载之后

二、更新阶段：this.setState({})

	   componentWillReceiveProps:组件将要接收到属性的时候调用
	   shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回false，接收数据后不更新，阻止render调用重绘）
	   componentWillUpdate:组件即将更新不能修改属性和状态
	   render:组件重新描绘
	   componentDidUpdate:组件已经更新

三、销毁阶段：ReactDOM.unmountComponentAtNode(div)

	   componentWillUnmount:组件即将销毁

