import { takeEvery, put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { FETCH_HOME_MULTIDATA, ADD_NUMBER } from './constants'
import { changeBannersAction, changeRecommendAction } from './actionCreators'

function* fetchHomeMultidata() {
  const res = yield axios.get('xxx')
  const banners = res.data.data.banner.list
  const recommends = res.data.data.recommend.list
  // yield put(changeBannersAction(banners))
  // yield put(changeRecommendAction(recommends))
  yield all([
    yield put(changeBannersAction(banners)),
    yield put(changeRecommendAction(recommends))
  ])
}

// 生成器函数(书写时按规范加“*”)
function* mySaga() {
  yield all([
    // 监听action中的type，进行拦截
    // takeLatest takeEvery区别:
    // takeLatest: 依次只能监听一个对应的action
    // takeEvery: 每一个都会被执行
    takeLatest(FETCH_HOME_MULTIDATA, fetchHomeMultidata),
    // takeLatest(ADD_NUMBER, fetchHomeMultidata),
  ])
}

export default mySaga