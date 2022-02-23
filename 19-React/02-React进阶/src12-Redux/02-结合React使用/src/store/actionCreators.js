import { ADD_NUMBER, SUB_NUMBER, INCREMENT, DECREMENT, CHANGE_BANNERS, CHANGE_RECOMMEND } from './constants.js'
import axios from 'axios'

// 写法一
/* export function addAction(num) {
  return {
    type: "ADD_NUMBER",
    num
  }
} */
// 写法二
/* export const addAction = (num) => {
  return {
    type: "ADD_NUMBER",
    num
  }
} */
// 写法三
export const addAction = num => ({
  type: ADD_NUMBER,
  num
})
export const subAction = num => ({
  type: SUB_NUMBER,
  num
})
export const incAction = () => ({
  type: INCREMENT
})
export const decAction = () => ({
  type: DECREMENT
})

// 发送网络请求
export const changeBannersAction = (banners) => ({
  type: CHANGE_BANNERS,
  banners
})
export const changeRecommendAction = (recommends) => ({
  type: CHANGE_RECOMMEND,
  recommends
})

// 演示redux-thunk
// 该函数会被自动调用
export const getHomeMultidataAction = (dispatch, getState) => {
  axios({
    url: "xxx",
  }).then(res => {
    const data = res.data.data;
    dispatch(changeBannersAction(data.banner.list));
    dispatch(changeRecommendAction(data.recommend.list));
  })
}