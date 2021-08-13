<template lang="">
	<div class="todo-footer">
		<label>
			<!-- <input type="checkbox" v-model="isCheckAll" /> -->
			<!-- 默认插槽(不取名字的插槽)，只能写一个 -->
			<slot></slot>
		</label>

		<!-- <span>
			<span>已完成{{ completeSize }}</span> / 全部{{ todos.length }}
        </span> -->
		<!-- 命名插槽(取名字的插槽) -->
		<slot name="middle"></slot>

		<!-- <button
			class="btn btn-danger"
			v-show="completeSize > 0"
			@click="confirmClearCompleteTodos"
		>
			清除已完成任务
		</button> -->
		<slot name="right"></slot>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}
</style>
