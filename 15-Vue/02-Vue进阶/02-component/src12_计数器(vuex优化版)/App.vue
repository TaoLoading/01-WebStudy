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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	/* computed: {
		count() {
			return this.$store.state.count
		},
		evenOrOdd() {
			return this.$store.getters.evenOrOdd
		},
    }, */
	computed: {
		...mapState(['count']), // 解构之后：{'count'() {return this.$store.state['count']}}，下方同理
		...mapGetters(['evenOrOdd']),
	},

	/* methods: {
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
    }, */
	methods: {
		...mapMutations({
			// 由于此处函数名与值不相同，故采取传对象形式而不是数组
			increment: 'INCREMENT',
			decrement: 'DECREMENT',
		}),
		...mapActions(['incrementIfOdd', 'incrementAsync']),
	},
}
</script>
<style scoped></style>
