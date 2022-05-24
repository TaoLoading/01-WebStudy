<template>
  <div>Child</div>
  <div>{{ msg }}</div>
  <button @click="emitXxx">输出数据</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  /**
   * setup()细节问题：
   * setup在beforeCreate生命周期前就执行了，且只执行一次
   * 由此可推断出setup()执行前组件还未创建出来，也就意味着组件实例对象this不能用，为undefined，故不能使用this去调用data/methods/...其中的相关内容
   * setup()返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
   * setup()返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
   * setup()返回对象中的方法会与methods中的方法合并成功组件对象的方法
   * 注：一般不要混合data和setup或methods和setup使用
   *
   * setup()参数：
   * setup(props, context) / setup(props, {attrs, slots, emit})
   * props: 包含props配置声明且传入了的所有属性的对象
   * attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
   * slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
   * emit: 用来分发自定义事件的函数, 相当于 this.$emit
   */
  name: 'Child',
  props: ['msg'],
  beforeCreate() {
    console.log('beforeCreate()执行了')
  },
  setup(props, context) {
    function emitXxx() {
      // 通过context.emit()分发事件
      context.emit('xxx')
    }
    console.log('setup()执行了')
    return {
      emitXxx
    }
  }
})
</script>

<style scoped>
</style>
