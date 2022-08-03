<template>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input type="text" placeholder="请输入姓氏" v-model="user.firstName" />
    <br />
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName1" />
    <br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName2" />
    <br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName3" />
  </fieldset>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect
} from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    const user = reactive({
      firstName: '东方',
      lastName: '不败'
    })

    // 第一个姓名的显示(计算属性)
    const fullName1 = computed(() => {
      // 计算属性只传入一个回调函数则表示get
      return user.firstName + '_' + user.lastName
    })

    // 第二个姓名的显示(计算属性)
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val: string) {
        const name = val.split('_')
        user.firstName = name[0]
        user.lastName = name[1]
      }
    })

    // 第三个姓名的显示(监视)
    const fullName3 = ref('')
    watch(
      user, // 如果监听引用类型中的某个属性是，要写成回调函数的形式：() => obj.a
      ({ firstName, lastName }) => {
        fullName3.value = firstName + '_' + lastName
      },
      // immediate为true即默认开始时执行一次，deep为true即深度监视
      { immediate: true, deep: true }
    )

    // 也是监视，不需要配置immediate，默认开始时执行一次
    /* watchEffect(() => {
      fullName3.value = user.firstName + "_" + user.lastName;
    }); */

    // watchEffect清除副作用
    const stop = watchEffect((onInvalidate) => {
      const timer = setInterval(() => {
        console.log('发起了网络请求')
      }, 2000)
      onInvalidate(() => {
        clearInterval(timer)
        console.log('执行了onInvalidate')
      })
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
      stop
    }
  }
})
</script>
