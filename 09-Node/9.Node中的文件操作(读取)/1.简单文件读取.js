/*
 *  fs.readFile(path[, options], callback)
 *     --path：要读取文件的路径+文件名+后缀
 *     --options：配置对象（可选）
 *     --callback：回调
 *         --err：错误对象
 *         --data：读取出来的数据(写入时只需要写err)
 * */

//简单文件写入和简单文件读取，都是一次性把所有要读取或要写入的内容加到内存中，容易造成内存泄露。

let fs = require('fs')

// 读取文件
fs.readFile(__dirname + '/demo.txt', function (err, data) {
	// if、else中只有一行时可以简写
	if (err) console.log(1)
	//为什么读取出来的东西是Buffer？ 用户存储的不一定是纯文本
	else console.log(data)

	// 输出字符串
	// else console.log(data.toString())

	// 将读取的文件换成test.txt再写入到文件夹中
	fs.writeFile(__dirname + '/test.txt', data, function (err) {
		if (err) console.log(err)
		else console.log('文件写入成功！')
	})
})
