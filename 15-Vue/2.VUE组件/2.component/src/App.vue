<template>
	<div>{{ msg }}</div>
</template>

<script>
export default {
	// data必须是函数的形式
	data() {
		return {
			msg: 'First Vue Component',
		}
	},
}
</script>

<style>
div {
	color: red;
}
</style>
