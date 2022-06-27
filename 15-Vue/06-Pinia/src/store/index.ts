import { defineStore } from 'pinia'

// 1. 定义并导出容器
/**
 * 参数1：容器的ID，必须唯一。pinia会把所有的容器挂载到根容器
 * 参数2：选项对象
 */
export const useMainStore = defineStore('main', {
  /**
   * 类似于组件的 data ，用来存放数据
   * 1. 必须是函数：为了避免在服务端渲染时交叉请求导致的数据状态污染
   * 2. 必须是箭头函数：为了更好的ts类型推导
   * 返回值是一个函数，调用得到容器实例
   */
  state: () => {
    return {
      msg: 'hello world',
      count: 100
    }
  },
  // 类似于组件的 computed ，用来封装计算属性，有缓存的功能
  getters: {
    count10(state) {
      return state.count + 10
    }
  },
  // 类似于组件的 method ，用来封装业务逻辑，修改state
  actions: {
    changeData() {
      this.msg = 'world',
        this.count++
    }
  }
})