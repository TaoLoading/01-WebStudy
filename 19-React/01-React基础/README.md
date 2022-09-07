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

### state
