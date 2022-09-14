# 工具函数
## 0. 工具函数库: lodash
    1. 封装了各种类型数据简化操作的函数库
        数组
        对象
        函数
        字符串
        类型判断
        ...
    2. 特点:
        模块化
        函数式 / 声明式

## 1. 函数的call() / apply() / bind()
    1. 区别call()/apply()/bind()
        call(obj)/apply(obj): 调用函数, 指定函数中的this为第一个参数的值
        bind(obj): 
            返回一个新的函数, 新函数内部会调用原来的函数, 且this为bind()指定的第一参数的值
            一旦调用新函数, 原函数就会调用, 且tis是bind指定的第一个参数
            如果直接调用原函数, this不是bind指定的第一个参数
        注意: 如果obj是null/undefined, this为window
    2. 应用
        call()/apply()应用: 根据伪数组生成真数组
        bind(): react中组件的自定义方法 / vue中的事件回调函数内部
    3. 自定义call()/apply()
        1). 给obj添加一个临时方法, 方法名任意, 值为当前函数
        2). 通过obj调用这个临时方法, 并将接收的参数传入
        3). 删除obj上的这个临时方法属性
    4. 自定义实现bind()
        1). 返回一个新函数
        2). 在新函数内部通过原函数对象的call方法来执行原函数
            指定原函数的this为obj
            指定参数为bind调用的参数和后面新函数调用的参数

## 2. 函数的节流(throttle)与防抖(debounce)
    1. 事件频繁触发可能造成的问题?
        1). 一些浏览器事件:window.onresize、window.mousemove等，触发的频率非常高，会造成浏览器性能问题
        2). 如果向后台发送请求，频繁触发，对服务器造成不必要的压力
    2. 如何限制事件处理函数频繁调用
        1). 函数节流
        2). 函数防抖
    3. 函数节流(throttle)
        1). 理解: 
            在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
            适合多次事件按时间做平均分配触发
        2). 场景：
            窗口调整（resize）
            页面滚动（scroll）
            DOM 元素的拖拽功能实现（mousemove）
            抢购疯狂点击（click）
    4. 函数防抖(debounce)
        1). 理解:
            在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。
            适合多次事件一次响应的情况
        2). 场景：
            输入框实时搜索联想（keyup/input）

## 3. 数组声明式系列方法
    1. 区别命令式与声明式
    2. 使用数组声明式系列方法
        1). map()
        2). reduce()
        3). filter()
        4). find()
        5). findIndex()
        6). every()
        7). some()
    3. 自定义数组声明式系列方法

## 4. 数组去重(unique)
    1. 理解: 
        根据当前数组产生一个去除重复元素后的新数组
        如: [2, 3, 2, 7, 6, 7] ==> [2, 3, 7, 6]
    2. 实现:
        方法1: 利用forEach()和indexOf()
               说明: 本质是双重遍历, 效率差些
        方法2: 利用forEach() + 对象容器
               说明: 只需一重遍历, 效率高些
        方法3: 利用ES6语法: from + Set 或者 ... + Set
               说明: 编码简洁

## 5. 数组合并(concat)与切片(slice)
    1. 合并concat()
        语法: var new_array = concat(array, value1[, value2[, ...[, valueN]]]) 
        功能: 将n个数组或值与当前数组合并生成一个新数组, 原始数组不会被改变 
    2. 切片slice()
        语法: var new_array = slice(array, [begin[, end]])
        功能: 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变

## 6. 数组扁平化(flatten)
    1. 理解: 
        取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
        如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
    2. 实现:
        方法一: 递归 + reduce() + concat()
        方法二: ... + some() + concat()

## 7. 数组取真与分块
    1. compact(array): 返回数组中所有真值元素组成的新数组
    2. chunk(array, size): 将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组

## 8. 数组取差异与合并
    1. difference(arr1, arr2)
        得到当前数组中所有不在arr中的元素组成的数组(不改变原数组)
        如: difference([1,3,5,7], [5, 8])  ==> [1, 3, 7]
    2. mergeArray(arr1, arr2): 
        将arr2与arr1的元素进行合并组成一个新的数组(不改变原数组)
        如: mergeArray([1,3,5,7,5], [5, 8]) ==> [1, 3, 5, 7, 5, 8]

## 9. 删除数组中部分元素
    1. pull(array, ...values): 
        删除原数组中与value相同的元素, 返回所有删除元素的数组
        说明: 原数组发生了改变
        如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 原数组变为[1, 5], 返回值为[3,3,7]
    2. pullAll(array, values): 
        功能与pull一致, 只是参数变为数组
        如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组1变为[1, 5], 返回值为[3,3,7] 

## 10. 得到数组的部分元素
    1. drop(array, count): 
        得到当前数组过滤掉左边count个后剩余元素组成的数组
        说明: 不改变当前数组, count默认是1
        如: drop([1,3,5,7], 2) ===> [5, 7]
    2. dropRight(array, count): 
        得到当前数组过滤掉右边count个后剩余元素组成的数组
        说明: 不改变当前数组, count默认是1
        如: dropRight([1,3,5,7], 2) ===> [1, 3]

## 11. 自定义new和instanceof工具函数
    1. 自定义new工具函数
        语法: newInstance(Fn, ...args)
        功能: 创建Fn构造函数的实例对象
        实现: 创建空对象obj, 调用Fn指定this为obj, 返回obj
    2. 自定义instanceof工具函数
        语法: myInstanceOf(obj, Type)
        功能: 判断obj是否是Type类型的实例
        实现: Type的原型对象是否是obj的原型链上的某个对象, 如果是返回tru, 否则返回false

## 12. 合并多个对象
    语法: object mergeObject(...objs)
    功能: 合并多个对象, 返回一个合并后对象(不改变原对象)

## 13. 对象/数组拷贝
    1. 区别浅拷贝与深拷贝
        纯语言表达:
            浅拷贝: 只是复制了对象属性或数组元素本身(只是引用地址值)
            深拷贝: 不仅复制了对象属性或数组元素本身, 还复制了指向的对象(使用递归)
        举例说明: persons拷贝
            浅拷贝: 只是拷贝了每个person对象的引用地址值, 每个person对象只有一份
            深拷贝: 每个person对象也被复制了一份新的
    2. 实现浅拷贝
        方法一: 利用ES6语法
        方法二: 利用ES5语法
    3. 实现深拷贝
        1). 大众乞丐版
            问题1: 函数属性会丢失
            问题2: 循环引用会出错
        2). 面试基础版本
            解决问题1: 函数属性还没丢失
        3). 面试加强版本
            解决问题2: 循环引用正常
        4). 面试加强版本2(优化遍历性能)
            数组: while | for | forEach() 优于 for-in | keys()&forEach() 
            对象: for-in 与 keys()&forEach() 差不多

## 14. 字符串处理的系列方法
    1. 字符串倒序: reverseString(str)  生成一个倒序的字符串
    2. 字符串是否是回文: palindrome(str) 如果给定的字符串是回文，则返回 true ；否则返回 false
    3. 截取字符串: truncate(str, num) 如果字符串的长度超过了num, 截取前面num长度部分, 并以...结束

## 15 手写继承
    实现方式: 寄生组合式
    解决问题: 
        原型对象有不必要的属性
        多调用了1次父类型构造函数

## 16. 手写事件总线: event-bus
    1. EventBus: 包含所有功能的全局事件总线对象
    2. EventBus.on(eventName, listener): 绑定事件监听
    3. EventBus.emit(eventName, data): 分发事件
    4. EventBus.off(eventName): 解绑事件监听

## 17. 手写消息订阅与发布: pub-sub
    1. PubSub: 包含所有功能的订阅/发布消息的管理者
    1. PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
    2. PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
    3. PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
    4. PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅

## 18. 手写Promise
    1. 定义整体结构
    2. Promise构造函数的实现
    3. promise.then()/catch()的实现
    4. Promise.resolve()/reject()的实现
    5. Promise.all/race()的实现
    6. Promise.resolveDelay()/rejectDelay()的实现

## 19. 手写ajax请求函数: axios
    1.函数的返回值为promise, 成功的结果为response, 失败的结果为error
    2.能处理多种类型的请求: GET/POST/PUT/DELETE
    3.函数的参数为一个配置对象
      {
        url: '',   // 请求地址
        method: '',   // 请求方式GET/POST/PUT/DELETE
        params: {},  // GET/DELETE请求的query参数
        data: {}, // POST或DELETE请求的请求体参数 
      }
    4.响应json数据自动解析为js的对象/数组



