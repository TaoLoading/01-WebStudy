## React基础学习

### 虚拟DOM
1. 创建方式
   * 使用原生js创建
    ```
    let vDOM = React.createElement('h2', { id: myID }, React.createElement('span', {}, myData))
    ```
   * 使用React创建
    ```
    let vDOM2 =
      <h2 id={myID.toUpperCase()}>
        <span className="red">
          {myData.toUpperCase()}
        </span>
      </h2>
    ```
2. 特征
   * 本质是一个Object类型的对象
   * 相较真实DOM而言比较轻，少很多属性
   * 最终虚拟DOM会被React转化为真实DOM

### jsx语法基础规则
1. 根标签只能有一个
2. 定义虚拟DOM时无需加引号
3. 标签中使用js表达式时要加{}
4. 使用样式类名时要用className，而不是class
5. 使用内联样式时要用`style={{key: value}}`的形式
6. 标签首字母相关
   1. 首字母小写，则当做html元素，若无该元素则报错
   2. 首字母大写，则当做组件，若无该组件则报错

### 组件创建方式
1. 工厂函数
2. 类（继承React.Component）

### 一般方法
1. 方法定义在类的原型对象上(即类中，与构造器同级)，供实例使用
2. 在调用方法时，以点击为例：
   ```
    return <h2 onClick={this.handlerClick}>{isPig ? '佩奇是一头可爱的猪' : '佩奇不是猪'}</h2>
   ```
3. 在上述基础上，若定义方法时采用function方式，则调用方法时需注意this指向问题
   1. 直接使用上述形式调用会报this为undefined，因为此种方式调用方法的不是类的实例对象而是全局，而在类中自动开启严格模式，导致this为undefined
   2. 修改this执行，在构造其中执行``` this.handlerClick = this.handlerClick.bind(this) ```。由于构造器中的this指向实例对象，即对方法的this指向进行修改后返回，返回的是this指向为实例对象的新方法
   3. 若定义方法时采用箭头函数方式，则不会出现该问题

### state (状态)
1. 初始化状态，在构造器中``` this.state = { key: value } ``` 或者 ``` state = { key: value } ```
2. 修改状态``` this.setState({ key: value }) ```

### props (属性)
1. 传递属性的方式
   * 键值对方式
   * 展开运算符方式
2. 限制传值的类型。在类内部定义，单页面开发时须引入prop-types.js
   ```
   static propTypes = {
     name: PropTypes.string.isRequired, // 即限制类型为string，必传
     sex: PropTypes.string.isRequired,
     age: PropTypes.number
   }
   ```
3. 设置默认值。在类内部定义，单页面开发时须引入prop-types.js
   ```
   static defaultProps = {
     age: 18
   }
   ```
4. props是只读的，不可直接修改
5. 构造器相关：当定义构造器时，是否接收props以及是否将props传递给super，取决于是否希望在构造器中通过this访问props，不传递则会导致this.props为undefined

### ref (标识)
1. 字符串形式的ref (官方不推荐)
   1. 定义ref：``` <input type="text" placeholder="点击按钮时提示" ref="input1" />&nbsp; ```
   2. 使用ref：``` this.refs.input1.value ```
   3. 执行次数：初始时执行1次
2. 回调形式的ref
   1. 定义ref：``` <input type="text" placeholder="点击按钮时提示" ref={(currentNode) => { this.input = currentNode }} /> ```
   2. 使用ref：``` this.input.value ```
   3. 执行次数：初始时执行1次；更新时执行2次，第一次传入参数为null，第二次传入参数为DOM元素。因为每次渲染都是设置新的函数，当将函数定义为类自身的函数则不会出现更新执行2次的现象
3. createRef形式的ref
   1. 定义ref容器，用于存储被ref标识的节点，且只能存储一个：``` myRef = React.createRef() ```
   2. 将节点放到ref容器中： ``` <input type="text" ref={this.myRef} /> ```
   3. 使用ref，拿到相应DOM元素：``` let { current } = this.myRef ```
   4. 执行次数：执行一次

### 受控组件与非受控组件
1. 受控组件：输入项在输入时会自动将内容维护到state中，则该组件叫做受控组件
2. 非受控组件：输入项在输入时不会自动将内容维护到state中，则该组件叫做非受控组件

### 组件的生命周期