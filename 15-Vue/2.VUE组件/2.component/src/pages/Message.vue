<template>
	<div>
		<ul>
			<li v-for="m in messages" :key="m.id">
				<router-link to="path">{{ m.title }}</router-link>
			</li>
		</ul>
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
