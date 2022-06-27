<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
/**
 * 父向子传值与vue2一致
 * 子组件使用defineProps接收父组件传过来的值，vue2中使用props。Vue3如下：
 * defineProps<{
 *   title:string,
 * }>()
 * 以上代码可以借助ts修改为：
 * type Props = {
 *  title: string
 * }
 * defineProps<Props>()
 * 
 * 可以使用withDefaults为可选值设置默认值
 * withDefaults(defineProps<Props>(), {
 *  title: '默认值'
 * })
 * 
 * 子向父组件传参，方法一：
 * 通过defineEmits派发一个事件的形式实现。如下代码
 * 1. 使用defineEmits注册一个事件
 * 2. 绑定一个事件用于触发emit，从而派发注册的事件，通过派发时间传递参数
 * 父组件接收传过来的参数
 * 1. 在父组件中定义用于接收参数的事件，如：
 * const getList = (list: number[]) => { console.log(list) }
 * 2. 在template的对应子组件中加入 @事件名="父组件中用于接收参数的事件名"
 * 
 * 
 * 子向父组件传参，方法二：
 * 1. 子组件中使用defineExpose向外暴露数据，如：defineExpose({ list })
 * 2. 父组件中使用ref拿到子组件的实例，从实例中读取
 */

const list = reactive([1, 2, 3])

// 子组件向父组件传参
const emit = defineEmits(['on-click'])
const click = () => {
  emit('on-click', list) // 两个参数，1.绑定的事件名 2.传递的参数
}
</script>

<style lang="scss" scoped>
</style>
