/* 
包含n个用于间接更新状态数据的方法的对象
*/
import { REQUESTING, REQ_SUCCESS, REQ_ERROR } from './mutation-type'
import axios from 'axios'

export default {
	// 搜索
	async search({ commit }, searchName) {
		// 更新数据状态(请求中)
		commit(REQUESTING)

		// 发送异步ajax请求，获取users数据
		try {
			const response = await axios.get(
				'https://api.github.com/search/users',
				{
					params: {
						q: searchName,
					},
				}
			)
			// 请求成功，更新成功的数据
			const result = response.data
			const users = result.items.map((item) => ({
				username: item.login,
				url: item.html_url,
				avatar_url: item.avatar_url,
			}))
			commit(REQ_SUCCESS, users)
		} catch (error) {
			// 请求失败，更新失败的数据
			commit(REQ_ERROR, '请求出错' + error.message)
		}
	},
}
