<template>
	<div class="container">
		<Search></Search>
		<Main></Main>
	</div>
</template>

<script>
import Search from './components/Search.vue'
import Main from './components/Main.vue'
export default {
	components: {
		Main,
		Search,
	},
}
</script>

<style scoped></style>
