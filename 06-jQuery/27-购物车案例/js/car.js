$(function () {
	// 全选模块
	// 全选功能
	$('.checkall').change(function () {
		// 拿到全选按钮改变时的状态，并赋值给小选框和全选按钮(上下全选按钮相关联)
		$('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))

		// 全选按钮关联商品栏背景
		// 判断全选按钮是否被选中
		if ($('.checkall').prop('checked')) {
			$('.cart-item').addClass('check-cart-item')
		} else {
			$('.cart-item').removeClass('check-cart-item')
		}
	})
	// 小选框全部选中时全选也被选中
	$('.j-checkbox').change(function () {
		// 判断选中的小选框个数是否等于全部小选框个数
		if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
			$('.checkall').prop('checked', true)
		} else {
			$('.checkall').prop('checked', false)
		}

		// 小选框关联商品栏背景
		if ($('.j-checkbox').prop('checked')) {
			$(this).parents('.cart-item').addClass('check-cart-item')
		} else {
			$(this).parents('.cart-item').removeClass('check-cart-item')
		}
	})

	// 增减商品模块
	// 点击加号增多商品数量
	$('.increment').click(function () {
		// 拿到加号兄弟标签的值
		var n = $(this).siblings('.itxt').val()
		n++
		$(this).siblings('.itxt').val(n)

		// 修改商品小计
		// 获取当前商品价格p
		// var p = $(this).parent().parent().siblings('.p-price').html() // 点击的是加号，从加号出发找到'p-price'，关系为：this --> 父亲 --> 父亲 --> 兄弟
		var p = $(this).parents('.p-num').siblings('.p-price').html()
		// 去掉￥符号
		p = p.substr(1)
		// 保留小数点后两位
		var price = (p * n).toFixed(2)
		// 获取并修改小计
		$(this)
			.parents('.p-num')
			.siblings('.p-sum')
			.html('￥' + price)
		getSum()
	})
	// 点击减号减少商品数量
	$('.decrement').click(function () {
		// 拿到加号兄弟标签的值
		var n = $(this).siblings('.itxt').val()
		if (n == 1) {
			return false
		} else {
			n--
			$(this).siblings('.itxt').val(n)
		}

		// 修改商品小计
		// 获取当前商品价格p
		// var p = $(this).parent().parent().siblings('.p-price').html() // 点击的是减号，从加号出发找到'p-price'，关系为：this --> 父亲 --> 父亲 --> 兄弟
		var p = $(this).parents('.p-num').siblings('.p-price').html()
		// 去掉￥符号
		p = p.substr(1)
		// 保留小数点后两位
		var price = (p * n).toFixed(2)
		// 获取并修改小计
		$(this)
			.parents('.p-num')
			.siblings('.p-sum')
			.html('￥' + price)
		getSum()
	})

	// 总计与总额模块
	// 计算初试总计与总额
	getSum()
	function getSum() {
		var count = 0
		var money = 0
		// 总计
		$('.itxt').each(function (index, ele) {
			count += parseInt($(ele).val())
			$('.amount-sum em').text(count)
		})

		// 总额
		$('.p-sum').each(function (index, ele) {
			money += parseFloat($(ele).text().substr(1)) // 注意去掉￥
			$('.price-sum em').text('￥' + money.toFixed(2))
		})
	}

	// 删除商品模块
	// 商品栏删除按钮
	$('.p-action').click(function () {
		// 点击当前按钮删除当前商品栏
		$(this).parents('.cart-item').remove()
		// 删除后重新计算总计和总额
		getSum()
	})
	// 删除选中商品
	$('.remove-batch').click(function () {
		// 获取复选框被选中的元素：$('.j-checkbox:checked')
		$('.j-checkbox:checked').parents('.cart-item').remove()
		// 删除后重新计算总计和总额
		getSum()
	})
	// 清空购物车
	$('.clear-all').click(function () {
		$('.cart-item').remove()
		// 删除后重新计算总计和总额
		getSum()
	})
})
