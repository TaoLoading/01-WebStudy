<template>
	<div v-if="!repoName">loading...</div>
	<div v-else>
		moast star repo is <a :href="repoUrl">{{ repoName }}</a>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			repoName: '',
			repoUrl: '',
		}
	},

	mounted() {
		// 发送ajax请求
		// 用到的测试连接：https://api.github.com/search/repositories?q=v&sort=stars
		// q是指定查询关键字，sort=stars是指定按照stars数量排序

		// 使用vue-resource发送ajax请求
		/* this.$http
			.get('https://api.github.com/search/repositories?q=v&sort=stars')
			.then((response) => {
                // 获得需要的数据
				const result = response.data
				const { name, html_url } = result.items[0]
				// 更新浏览器中的数据
				this.repoName = name
				this.repoUrl = html_url
			})
			.catch((error) => {
				alert('请求出错，请检查代码')
			}) */

		// 使用axios发送ajax请求
		axios
			.get('https://api.github.com/search/repositories', {
				params: {
					q: 'v',
					sort: 'stars',
				},
			})
			.then((response) => {
				// 获得需要的数据
				const result = response.data
				const { name, html_url } = result.items[0]
				// 更新浏览器中的数据
				this.repoName = name
				this.repoUrl = html_url
			})
			.catch((error) => {
				alert('请求出错，请检查代码')
			})
	},
}
</script>

<style scoped></style>
