import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
const { Meta } = Card

export default class CSSTransitionDemo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isShow: true
    }
  }

  render() {
    const { isShow } = this.state;

    return (
      <div>
        <button onClick={e => { this.setState({ isShow: !isShow }) }}>显示/隐藏</button>
        {/**
         * in：决定动画显示和隐藏
         * classNames：类名前加上card
         * timeout：动画执行时间
         * unmountOnExit：退出的时候是否卸载dom
         */}
        <CSSTransition in={isShow}
          classNames="card"
          timeout={5000}
          unmountOnExit={true}
          appear
          onEnter={el => console.log("开始进入")}
          onEntering={el => console.log("正在进入")}
          onEntered={el => console.log("进入完成")}
          onExit={el => console.log("开始退出")}
          onExiting={el => console.log("退出状态")}
          onExited={el => console.log("退出完成")}
        >
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </CSSTransition>
      </div>
    )
  }
}
