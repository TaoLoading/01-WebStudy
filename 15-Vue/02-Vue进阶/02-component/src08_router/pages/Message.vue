<template>
	<div>
		<ul>
			<li v-for="m in messages" :key="m.id">
				<!-- 链接到对应的文章 -->
				<!-- 由于是动态的，故应加上冒号，里面是一个字符串 -->
				<!-- 使用拼串的形式书写路径 -->
				<!-- <router-link
					:to="`/home/message/detail/${m.id}?title=${m.title}`"
					>{{ m.title }}</router-link
				> -->
				<!-- 使用命名路由的形式书写路径(配合路由中的name) -->
				<router-link
					:to="{
						name: 'detail',
						params: { mid: m.id },
						query: { title: m.title },
					}"
					>{{ m.title }}</router-link
				>
				<button @click="pushShow(m)">push查看</button>
				<button @click="replaceShow(m)">replace查看</button>
			</li>
		</ul>
		<button @click="$router.back()">回退</button>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			messages: [],
		}
	},
	mounted() {
		// 模拟请求获取message
		setTimeout(() => {
			const messages = [
				{ id: 1, title: 'messages001' },
				{ id: 2, title: 'messages002' },
				{ id: 3, title: 'messages003' },
			]
			// 更新数据
			this.messages = messages
		}, 1000)
	},
	methods: {
		// push和replace的区别就在于回退，push是逐层回退，replace是回退到起点
		pushShow(message) {
			// 编程式路由导航
			this.$router.push({
				name: 'detail',
				params: { mid: message.id },
				query: { title: message.title },
			})
		},
		replaceShow(message) {
			// 编程式路由导航
			this.$router.replace({
				name: 'detail',
				params: { mid: message.id },
				query: { title: message.title },
			})
		},
	},
}
</script>
<style scoped></style>
