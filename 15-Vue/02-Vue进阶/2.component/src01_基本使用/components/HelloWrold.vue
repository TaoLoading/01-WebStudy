<template lang="">
	<div>
		<h2>{{ msg }}</h2>
	</div>
</template>
<script>
export default {
	data() {
		return {
			msg: 'hello world!',
		}
	},
}
</script>
<style scoped>
/* 
    scoped限定样式只对当前组件有效
    原理：当前组件的标签会自动添加一个特定的属性，样式的选择器也添加对应的属性选择，从而将样式匹配给特定的标签
 */
h2 {
	color: blue;
}
</style>
