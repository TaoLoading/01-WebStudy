$(function () {
	// 节流阀
	var flag = true

	var toolTop = $('.recommend').offset().top
	$(window).scroll(function () {
		// 导航栏的显示与隐藏
		if ($(document).scrollTop() >= toolTop) {
			$('.fixedtool').fadeIn()
		} else {
			$('.fixedtool').fadeOut()
		}

		// 设置节流阀，控制点击导航栏时不会触发导航栏滚动效果
		if (flag) {
			// 导航栏跟随页面滚动变化
			$('.floor .w').each(function (index, item) {
				if ($(document).scrollTop() >= $(item).offset().top) {
					$('.fixedtool li')
						.eq(index)
						.addClass('current')
						.siblings()
						.removeClass()
				}
			})
		}
	})

	// 点击导航栏跳转到对应模块
	$('.fixedtool li').click(function () {
		// 打开节流阀
		flag = false

		// 获取每个导航栏对应模块的offset，导航栏的下标：this.index()，对应模块的下标：$('.floor .w').eq($(this).index())
		var current = $('.floor .w').eq($(this).index()).offset().top
		// 页面滚动
		$('body,html')
			.stop()
			.animate(
				{
					scrollTop: current,
				},
				// 滚动结束后关闭节流阀
				function () {
					flag = true
				}
			)
		// 当前li颜色更改
		$(this).addClass('current').siblings().removeClass()
	})
})
