'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
 * module3使用【默认暴露】，只能暴露一次。
 * */
exports.default = {
	name: 'peiqi',
	age: 18,
	speak: function speak() {
		var _this = this;

		setTimeout(function () {
			console.log('\u6211\u7684\u540D\u5B57\u662F' + _this.name + '\uFF0C\u6211\u7684\u5E74\u9F84\u662F' + _this.age);
		}, 1000);
	}
};