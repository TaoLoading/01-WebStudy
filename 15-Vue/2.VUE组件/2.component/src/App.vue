<template>
	<div v-if="!repoName">loading...</div>
	<div v-else>
		moast star repo is <a :href="repoUrl">{{ repoName }}</a>
	</div>
</template>

<script>
export default {
	data() {
		return {
			repoName: '',
			repoUrl: '',
		}
	},

	mounted() {
		// 使用vue-resource发送ajax请求
		// 使用axios发送ajax请求
	},
}
</script>

<style scoped></style>
