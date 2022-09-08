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
1. 初始化状态``` this.state = { key: value } ``` 或者 ``` state = { key: value } ```
2. 修改状态``` this.state({ key: value }) ```


### props (属性)