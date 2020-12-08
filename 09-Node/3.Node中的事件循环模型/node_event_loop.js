// Node中的事件循环模型
/*
clearImmediate:清空立即执行函数
clearInterval:清除循环定时器
clearTimeout: 清除延迟定时器

setImmediate:设置立即执行函数
setInterval:设置循环定时器
setTimeout: 设置延迟定时器
*/

/*
    // 浏览器中的事件循环(轮询)模型是借助多个模块，Node.js是借助多个阶段

  第一个阶段：timers(定时器阶段--setTimeout,setInterval)
           1.开始计时
           2.执行定时器的回调

  第二个阶段：pending callbacks (系统阶段)

  第三个阶段：idle, prepare (准备阶段)

  第四个阶段：poll(轮询阶段，核心)
            ---如果回调队列里有待执行的回调函数(除定时器的回调)
                从回调队列中取出回调函数，同步执行(一个一个执行)，直到回调队列为空了，或者达到系统最大限度。
            ---如果回调队列为空
                  ---如果有设置过setImmediate
                      进入下一个check阶段，目的：为了执行setImmediate所设置的回调。
                  ---如果未设置过setImmediate
                      在此阶段停留，等待回调函数被插入回调队列。
                      若定时器到点了，进入下一个check阶段，原因：为了第一阶段，由于不能退回故需要先执行完第五、第六阶段

  第五个阶段：check (专门用于执行setImmediate所设置的回调)

  第六个阶段：close callbacks (关闭回调阶段)
  
  process.nextTick() ---- 用于设置立即执行函数(“VIP”-----能在任意阶段优先执行)
*/

//延迟定时器（定时器的回调）
setTimeout(() => {
	console.log('setTimeout所指定的回调函数执行了')
}) // 计时为0

//立即执行函数（回调）
setImmediate(() => {
	console.log('我是setImmediate指定的回调')
})

//立即执行函数（回调），第二执行。定时器和立即执行函数具体分析
process.nextTick(() => {
	console.log('process.nextTick所指定的回调执行了')
})

// 主线程，最先执行
console.log('我是主线程上的代码')

// 注意：
// 主线程上没有任务时，setImmediate()和setTimeout()的执行顺序不一定(统一代码多次执行结果可能不一样)，要看判断定时器是否执行的时间和setImmediate()执行的时间哪个快
// 主线程上有任务时，则一定是setTimeout()执行比setImmediate()快，因为程序在扫描代码到执行主线程的这段过程中消耗了时间，也就是为setTimeout()的判断争取了时间
