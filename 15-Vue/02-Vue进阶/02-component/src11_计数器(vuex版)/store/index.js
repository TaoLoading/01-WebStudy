/* 
vuex最核心的管理对象store
*/
import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

// 相当于data
const state = {
	// 初始化状态数据
	count: 1,
}

// 包含n个用于直接更新状态数据的方法的对象
const mutations = {
	// 采用大写仅是为了方便区分进行学习
	INCREMENT(state) {
		state.count++
	},
	DECREMENT(state) {
		state.count--
	},
}

// 包含n个用于间接更新状态数据的方法的对象
const actions = {
	/* increment(context) {
		// 将commit提交给mutation
		context.commit('INCREMENT')
	},
	decrement({ commit }) {
		commit('DECREMENT')
	}, */
	incrementIfOdd({ commit, state }) {
		if (state.count % 2 == 1) {
			commit('INCREMENT')
		}
	},
	incrementAsync({ commit }) {
		setTimeout(() => {
			commit('INCREMENT')
		}, 1000)
	},
}

// 包含n个基于state数据getter计算属性的方法的对象
const getters = {
	evenOrOdd() {
		return state.count % 2 == 1 ? '奇数' : '偶数'
	},
}

// 向外暴露store对象
export default new vuex.Store({
	state,
	mutations,
	actions,
	getters,
})
