/* 
包含n个用于直接更新状态数据的方法的对象
*/
import { REQUESTING, REQ_SUCCESS, REQ_ERROR } from './mutation-type'

export default {
	// 函数名是字符串，由于这里使用了变量，故需要加上'[]'
	[REQUESTING](state) {
		state.firstView = false
		state.loading = true
	},
	[REQ_SUCCESS](state, users) {
		state.loading = false
		state.users = users
	},
	[REQ_ERROR](state, msg) {
		state.loading = false
		state.errorMsg = msg
	},
}
