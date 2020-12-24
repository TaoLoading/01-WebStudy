<template>
	<li>
		<label>
			<input type="checkbox" v-model="todo.complete" />
			<span>{{ todo.title }}</span>
		</label>
		<button class="btn btn-danger" style="display:none">
			删除
		</button>
	</li>
</template>
<script>
export default {
	// 声明接收属性:指定属性名/属性值的类型
	props: {
		todo: Object,
	},
}
</script>
<style scoped>
li {
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	display: none;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}
</style>
