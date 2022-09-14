import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './TransitionGroup.css'

export default class TransitionGroupDemo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      names: ['name1', 'name2', 'name3']
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup>
          {
            this.state.names.map((item, index) => {
              return (
                <CSSTransition key={item}
                  timeout={500}
                  classNames="item">
                  <div>
                    {item}
                    <button onClick={e => this.removeItem(index)}>-</button>
                  </div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addName()}>+name</button>
      </div>
    )
  }

  addName() {
    this.setState({
      names: [...this.state.names, 'name1']
    })
  }

  removeItem(index) {
    // index indey indez
    this.setState({
      names: this.state.names.filter((item, indey) => index !== indey)
    })
  }
}
