<template>
	<div>
		<!-- <p>
			clicked {{ $store.state.count }} times, count is
			{{ $store.getters.evenOrOdd }}
        </p> -->
		<!-- 简化通过computed代码 -->
		<p>clicked {{ count }} times, count is{{ evenOrOdd }}</p>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementIfOdd">increment if odd</button>
		<button @click="incrementAsync">increment async</button>
	</div>
</template>
<script>
export default {
	computed: {
		count() {
			return this.$store.state.count
		},
		evenOrOdd() {
			return this.$store.getters.evenOrOdd
		},
	},
	methods: {
		increment() {
			// 触发mutations调用，直接更新状态数据
			this.$store.commit('INCREMENT')
		},
		decrement() {
			// 触发mutations调用，直接更新状态数据
			this.$store.commit('DECREMENT')
		},
		incrementIfOdd() {
			// 触发actions调用，简介更新状态数据
			this.$store.dispatch('incrementIfOdd')
		},
		incrementAsync() {
			// 触发actions调用，简介更新状态数据
			this.$store.dispatch('incrementAsync')
		},
	},
}
</script>
<style scoped></style>
