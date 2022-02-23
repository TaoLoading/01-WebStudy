import React, { PureComponent } from 'react'
import { incAction, addAction, changeBannersAction, changeRecommendAction } from '../store/actionCreators'
import { connect } from 'react-redux'
import axios from 'axios'

class addition extends PureComponent {
  componentDidMount() {
    // 发送网络请求
    axios({
      url: 'xxx'
    }).then(res => {
      const data = res.data.data;
      this.props.changeBanners(data.banner.list);
      this.props.changeRecommends(data.recommend.list);
    })
  }

  render() {
    return (
      <div>
        <div>Home</div>
        <h2>当前计数：{this.props.counter}</h2>
        <button onClick={e => this.props.increment()}>+1</button>
        <button onClick={e => this.props.addNumber(5)}>+5</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    banners: state.banners,
    recommends: state.recommends
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: function () {
      dispatch(incAction())
    },
    addNumber: function (num) {
      dispatch(addAction(num))
    },
    changeBanners(banners) {
      dispatch(changeBannersAction(banners));
    },
    changeRecommends(recommends) {
      dispatch(changeRecommendAction(recommends));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(addition)