<template>
	<div>
		<ul>
			<li v-for="m in messages" :key="m.id">
				<!-- 链接到对应的文章 -->
				<!-- 由于是动态的，故应加上冒号，里面是一个字符串 -->
				<!-- 拼接字符串写法一 -->
				<router-link :to="`/home/message/detail/${m.id}`">{{
					m.title
				}}</router-link>
				<!-- 拼接字符串写法二 -->
				<!-- <router-link :to="'/home/message/detail/' + m.id">{{ m.title }}</router-link> -->
			</li>
		</ul>
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
}
</script>
<style scoped></style>
