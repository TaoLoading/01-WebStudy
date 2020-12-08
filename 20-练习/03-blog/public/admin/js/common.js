// 定义获取用户输入值的方法
function serializeToJson(form) {
	var result = {}
	var f = form.serializeArray()
	f.forEach(function (item) {
		result[item.name] = item.value
	})
	return result
}
