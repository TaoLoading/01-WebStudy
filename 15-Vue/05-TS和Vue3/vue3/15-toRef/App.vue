<template>
  <h2>toRef的使用及特点</h2>
  <h3>state:{{state}}</h3>
  <h3>age:{{age}}</h3>
  <h3>money:{{money}}</h3>
  <hr>
  <button @click="updateData">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef } from "vue";
export default defineComponent({
  /**
   * toRef
   * 为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
   * 与ref的区别: 拷贝了一份新的数据值单独操作, 更新时相互不影响
   * 应用场景: 当要将某个prop的ref传递给复合函数时，toRef很有用
   */
  name: "",
  setup() {
    const state = reactive({
      age: 5,
      money: 100,
    });
    // 把响应式数据state对象中的属性age变成了ref对象
    const age = toRef(state, "age");
    //把响应式数据state对象中的属性money使用ref进行包装，变成了ref对象
    const money = ref(state.money);
    console.log(age);
    console.log(money);
    const updateData = () => {
      age.value += 2; // 数据同步更新
      money.value += 2; // 数据不同步更新
    };
    return {
      state,
      age,
      money,
      updateData,
    };
  },
});
</script>

<style scoped>
</style>
