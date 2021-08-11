// 需求：用户点击页面，把点击位置的横纵坐标收集起来并展示
import { onBeforeUnmount, onMounted, ref } from "vue"
export default function () {
  const x = ref(-1);
  const y = ref(-1);
  // 点击事件的回调函数
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };
  // 页面加载完毕后再进行点击操作
  onMounted(() => {
    window.addEventListener("click", clickHandler);
  });
  // 页面卸载之前将监听取消
  onBeforeUnmount(() => {
    window.removeEventListener("click", clickHandler);
  });
  return {
    x,
    y,
  };
}