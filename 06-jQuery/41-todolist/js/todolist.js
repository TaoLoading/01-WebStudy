$(function () {
	loadData()
	// 存储数据
	$('#title').on('keydown', function (event) {
		if (event.keyCode == 13) {
			// 检测输入内容是否为空
			if (
				$(this)
					.val()
					.replace(/(^\s*)|(\s*$)/g, '') === ''
			) {
				alert('请输入内容')
			} else {
				// 读取本地存储数据
				var local = getData()
				// 更新local数组，将新添加数据追加到local数组中
				local.push({ title: $(this).val(), done: false })
				// 将更新后的local数组放入本地存储数据
				saveData(local)
				// 将本地存储数据渲染到界面
				loadData()
				// 清空输入框
				$(this).val('')
			}
		}
	})
	// 删除数据
	$('ol, ul').on('click', 'a', function () {
		// 获取数据
		var data = getData()
		// 删除数据
		var index = $(this).attr('id')
		data.splice(index, 1)
		// 保存到本地存储
		saveData(data)
		// 重新渲染到界面
		loadData()
	})
	// 数据正在进行和已经完成操作
	$('ol,ul').on('click', 'input', function () {
		// 获取数据
		var data = getData()
		// 修改数据
		var index = $(this).siblings('a').attr('id')
		data[index].done = $(this).prop('checked')
		// 保存到本地存储
		saveData(data)
		// 重新渲染到界面
		loadData()
	})

	// 读取本地存储数据
	function getData() {
		var data = localStorage.getItem('todolist')
		if (data !== null) {
			// 本地存储数据为字符串格式
			return JSON.parse(data)
		} else {
			return []
		}
	}
	// 保存本地存储数据
	function saveData(data) {
		localStorage.setItem('todolist', JSON.stringify(data))
	}
	// 渲染本地数据
	function loadData() {
		// 获取本地数据
		var data = getData()
		// 清空原先ol和ul中的数据，防止重复添加
		$('ol, ul').empty()
		// 统计数据个数
		var todoCount = 0
		var doneCount = 0
		// 遍历数据并渲染
		$.each(data, function (index, item) {
			// 判断事件是否完成并分别渲染
			if (item.done) {
				// 已完成
				$('ul').prepend(
					'<li> <input type="checkbox" checked="checked"> <p>' +
						item.title +
						'</p> <a href="javascript:;" id=' +
						index +
						'></a> </li>' // 自定义属性id，用于区别标签a的序号
				)
				doneCount++
			} else {
				// 未完成
				$('ol').prepend(
					'<li> <input type="checkbox"> <p>' +
						item.title +
						'</p> <a href="javascript:;" id=' +
						index +
						'></a> </li>' // 自定义属性id，用于区别标签a的序号
				)
				todoCount++
			}
		})
		// 修改数据
		$('#donecount').text(doneCount)
		$('#todocount').text(todoCount)
	}
})
