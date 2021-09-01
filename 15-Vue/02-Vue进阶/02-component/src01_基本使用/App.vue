<template>
	<div>
		<h2>{{ msg }}</h2>
		<HelloWrold />
	</div>
</template>

<script>
// 引入组件
// import HelloWrold from './components/HelloWrold'
import HelloWrold from '@comps/HelloWrold'

export default {
	data() {
		return {
			msg: 'First Vue Component!',
		}
	},

	// 局部注册组件
	components: {
		// 格式：   组件标签名：组件
		// HelloWrold: HelloWrold,
		HelloWrold,
	},
}
</script>

<style>
div {
	color: red;
}
</style>
