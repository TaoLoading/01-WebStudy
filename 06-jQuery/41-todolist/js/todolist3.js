$(function () {
	loadData()
	// 存储数据
	$('#title').on('keydown', function (event) {
		event = event || window.event
		if (event.keyCode == 13) {
			// 获取数据
			var local = getData()
			// 更新数据
			local.push({ title: $(this).val(), done: false })
			// 存入数据
			saveData(local)
			// 将本地数据渲染到界面
			loadData()
			// 清空输入栏
			$(this).val('')
		}
	})

	// 删除数据
	$('ul,ol').on('click', 'a', function () {
		var data = getData()
		var index = $(this).attr('id')
		data.splice(index, 1)
		saveData(data)
		loadData()
	})

	// 正在进行和已经完成交互
	$('ol, ul').on('click', 'input', function () {
		var data = getData()
		// 获取当前点击的input下标
		var index = $(this).siblings('a').attr('id')
		// 修改done状态
		data[index].done = $(this).prop('checked')
		// 保存数据
		saveData(data)
		// 将数据重新渲染到界面
		loadData()
	})

	// 读取数据
	function getData() {
		var data = localStorage.getItem('todolist')
		if (data !== null) {
			return JSON.parse(data)
		} else {
			return []
		}
	}

	// 储存数据
	function saveData(data) {
		localStorage.setItem('todolist', JSON.stringify(data))
	}

	// 将本地数据渲染到界面
	function loadData() {
		var data = getData()
		// 清除之前ol，ul中的数据
		$('ol,ul').empty()
		// 统计数据数量
		var todoCount = 0
		var doneCount = 0
		$.each(data, function (index, item) {
			if (item.done) {
				// 将已完成的数据放入ul中
				$('ul').prepend(
					'<li><input type="checkbox" checked="checked"><p>' +
						item.title +
						'</p><a href=""javascript:; id=' +
						index +
						'></a></li>'
				)
				doneCount++
			} else {
				// 将未完成的数据放入ol中
				$('ol').prepend(
					'<li><input type="checkbox"><p>' +
						item.title +
						'</p><a href=""javascript:; id=' +
						index +
						'></a></li>'
				)
				todoCount++
			}
		})
		// 修改数据
		$('#donecount').text(doneCount)
		$('#todocount').text(todoCount)
	}
})
