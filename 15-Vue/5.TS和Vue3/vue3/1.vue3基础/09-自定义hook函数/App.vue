<template>
  <h2>自定义hook函数</h2>
  <hr>
  <h2>x:{{x}}, y:{{y}}</h2>
  <hr>
  <h3 v-if="loading">正在加载中...</h3>
  <h3 v-else-if="errorMsg">错误信息：{{errorMsg}}</h3>
  <ul v-else>
    <li>id: {{data.id}}</li>
    <li>address: {{data.address}}</li>
    <li>distance: {{data.distance}}</li>
  </ul>
  <ul v-for="item in data"
      :key="item.id">
    <li>id: {{item.id}}</li>
    <li>title: {{item.title}}</li>
    <li>price: {{item.price}}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useRequest from "./hooks/useRequest";

// 定义接口，约束对象类型
interface AddressData {
  id: number;
  address: string;
  distance: string;
}
interface ProductsData {
  id: string;
  title: string;
  price: number;
}

export default defineComponent({
  name: "App",
  setup() {
    // 需求1：用户点击页面，把点击位置的横纵坐标收集起来并展示
    const { x, y } = useMousePosition();
    // 需求2：封装发ajax请求的hook函数，监视data
    // const { loading, data, errorMsg } = useRequest<AddressData>("/data/address.json");
    const { loading, data, errorMsg } = useRequest<ProductsData[]>(
      "/data/products.json"
    );
    watch(data, () => {
      // console.log(data.value.length);
      if (data.value) {
        console.log(data.value?.length);
      }
    });
    return {
      x,
      y,
      loading,
      data,
      errorMsg,
    };
  },
});
</script>

<style scoped>
</style>
