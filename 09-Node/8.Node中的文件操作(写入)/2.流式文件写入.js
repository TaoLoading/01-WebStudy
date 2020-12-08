/*
 * 流式文件写入：
 *   fs.createWriteStream(path[, options])
 *     --path：写入文件的路径+文件名字
 *     --options：配置对象（可选）
 *         --flags：
 *           --w:写入数据
 *           --a:追加数据
 *         --encoding ：编码（默认值是utf-8）
 *         --fd:文件唯一标识(linux中用)
 *         --mode:文件权限控制
 *             --0o111:文件的可执行权限(几乎不用，linux有自己的一套文件权限控制)
 *             --0o222:文件的可写入权限
 *             -0o444:文件的可读取权限
 *         --autoClose:自动关闭文件，默认值是true
 *             --true
 *             --false
 *         --emitClose:强制关闭文件，默认值是false
 *         --start : 写入文件的起始位置(偏移量)，给数字
 * */

// 引入fs模块
let fs = require('fs')

// 创建一个可写流。创建完的同时打开可写流
let ws = fs.createWriteStream(__dirname + '/demo2.txt', {
	start: 10,
})

// 监听流的状态。只要用到了流，就要对流进行监听
ws.on('open', function () {
	console.log('可写流打开了')
})
ws.on('close', function () {
	console.log('可写流关闭了')
})

// 写入数据
ws.write('今天天气真晴朗\n')
ws.write('虽然有点热\n')
ws.write('但是要放学了，我很开心')

// 关闭可写流(流中没有数据需要写入时)
// ws.close() // 对于node的8版本来说，不可以用close关闭流，有问题，会导致数据丢失
ws.end()
