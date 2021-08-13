<template>
  <ul>
    <!-- <li>ID: {{ $route.params.mid }}</li> -->
    <!-- <li>Title: {{ detail.title }}</li> -->
    <!-- 由于使用了props映射params和query参数，故可直接读取 -->
    <li>ID: {{ mid }}</li>
    <li>Title: {{ title }}</li>
    <li>Content: {{ detail.content }}</li>
  </ul>
</template>

<script>
const allDetails = [
  { id: 1, title: 'message001', content: 'message content001' },
  { id: 2, title: 'message002', content: 'message content002' },
  { id: 3, title: 'message003', content: 'message content003' },
]
export default {
  // 接收传递来的参数
  props: ['mid', 'title'],

  data() {
    return {
      detail: {},
    }
  },

  // 在路由参数发生改变时，不会重新调用，因为之前的组件对象没有销毁和重新创建
  mounted() {
    // 模拟请求获取详细数据
    /* const mid = this.$route.params.mid
		setTimeout(() => {
			const detail = allDetails.find((detail) => mid == detail.id)
			this.detail = detail
        }, 1000) */
    this.show(this.$route)
  },

  // 监视路由的变化(本质是参数数据的变化 ==> 内部对$route进行了重新赋值)
  // 虽然组件对象没有销毁和重新创建，但是$route发生了变化，故通过监视$route.params.mid的方式获得数据的变化情况
  watch: {
    $route(to, from) {
      // to是$route的最新值，from是$route的原始值

      /* const mid = to.params.mid
			setTimeout(() => {
				const detail = allDetails.find((detail) => mid == detail.id)
				this.detail = detail
			}, 1000) */
      this.show(to)
    },
  },

  methods: {
    // 使用函数简化代码
    show(route) {
      const that = this
      setTimeout(() => {
        const detail = allDetails.find(
          (detail) => route.params.mid * 1 === detail.id
        )
        this.detail = detail
      }, 1000)
    },
  },
}
</script>

<style scoped></style>
