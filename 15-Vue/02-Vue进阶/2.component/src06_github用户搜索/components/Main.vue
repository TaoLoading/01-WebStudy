<template>
	<h2 v-if="firstView">请输入关键字进行查询</h2>
	<h2 v-else-if="loading">正在请求中...</h2>
	<h2 v-else-if="errorMsg">{{ errorMsg }}</h2>
	<div class="row" v-else>
		<div class="card" v-for="(user, index) in users" :key="index">
			<a :href="user.url" target="_blank">
				<img :src="user.avatar_url" style="width: 100px" />
			</a>
			<p class="card-text">{{ user.username }}</p>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	data() {
		return {
			firstView: true, // 是否显示第一个页面
			loading: false, // 是否显示loading页面
			users: [], // 用户列表
			errorMsg: '', // 错误信息
		}
	},

	mounted() {
		// 绑定事件监听
		this.$eventBus.$on('search', (searchName) => {
			// 更新数据，将页面变为请求中
			this.firstView = false
			this.loading = true
			// 发送搜素的ajax请求
			axios
				.get('https://api.github.com/search/users', {
					params: {
						q: searchName,
					},
				})
				.then((response) => {
					// 请求成功，更新成功的数据
					const result = response.data
					const users = result.items.map((item) => ({
						username: item.login,
						url: item.html_url,
						avatar_url: item.avatar_url,
					}))
					this.loading = false
					this.users = users
				})
				.catch((error) => {
					// 请求失败，更新失败的数据
					this.loading = false
					this.errorMsg = '请求出错' + error.message
				})
		})
	},
}
</script>
<style scoped>
.card {
	float: left;
	width: 33.333%;
	padding: 0.75rem;
	margin-bottom: 2rem;
	border: 1px solid #efefef;
	text-align: center;
}

.card > img {
	margin-bottom: 0.75rem;
	border-radius: 100px;
}

.card-text {
	font-size: 85%;
}
</style>
