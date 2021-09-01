<template>
	<div>
		<mt-button type="danger" @click="hint">danger</mt-button>
	</div>
</template>
<script>
import { MessageBox, Toast } from 'mint-ui'
export default {
	methods: {
		hint() {
			// 演示和Toast
			MessageBox.alert('点击了button').then((action) => {
				Toast({
					message: '提示',
					position: 'bottom',
					duration: 5000,
				})
			})
		},
	},
}
</script>
<style scoped></style>
