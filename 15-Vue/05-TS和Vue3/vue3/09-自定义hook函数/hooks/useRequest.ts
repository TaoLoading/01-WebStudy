import { ref } from 'vue'
import axios from 'axios'
// 发生ajax请求
export default function <T>(url: string) {
  // 加载状态
  const loading = ref(true)
  // 请求成功的数据。设置“T | null”是因为一开始为null，请求完成后才有数据
  const data = ref<T | null>(null)
  // 请求失败的数据
  const errorMsg = ref('')
  // 发送请求
  axios.get(url).then(res => {
    // 改变加载状态
    loading.value = false
    data.value = res.data
  }).catch(err => {
    // 改变加载状态
    loading.value = false
    errorMsg.value = err.message || '未知错误'
  })
  return {
    loading,
    data,
    errorMsg
  }
}