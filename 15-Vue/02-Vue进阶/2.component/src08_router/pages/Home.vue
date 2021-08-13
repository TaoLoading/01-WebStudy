<template>
	<div>
		<h2>Home</h2>
		<ul class="nav nav-tabs">
			<li>
				<!-- 路由链接 -->
				<router-link to="/home/news">News</router-link>
			</li>
			<li>
				<!-- 路由链接 -->
				<router-link to="/home/message">Message</router-link>
			</li>
		</ul>
		<!-- 在此显示二级路由组件 -->
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	name: 'Home',
}
</script>
<style scoped></style>
