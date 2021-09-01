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
		// 用到的测试链接：https://api.github.com/search/repositories?q=v&sort=stars
		// q是指定查询关键字，sort=stars是指定按照stars数量排序
		// 请求到这个地址的整个操作是跨域的，但github已经解决了跨域的问题
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
		//
		//
		//
		// 使用axios发送ajax请求
		/* axios
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
			}) */
		//
		//
		//
		// 发送到搭建的后台服务器，演示解决跨域问题
		axios
			// .get('https://localhost:4000/repositories/vue')
			.get('/api/repositories/vue')
			.then((response) => {
				const result = response.data // 根据后台返回的数据，此时result为{status: 0, data: {name, html_url}}
				const { name, html_url } = result.data
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
