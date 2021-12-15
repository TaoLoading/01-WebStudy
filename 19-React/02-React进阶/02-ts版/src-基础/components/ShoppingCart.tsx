import React, { Component } from 'react'
import styles from "./ShoppingCart.module.css"

interface Props { }

interface State {
  isOpen: boolean
}

export default class ShoppingCart extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("e.target ", e.target) // target描述的是事件发生的元素
    console.log("e.currentTarget ", e.currentTarget) // currentTarget描述的是绑定事件的元素
    if ((e.target as HTMLElement).nodeName === "SPAN") {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }

  render() {
    return (
      <div className={styles.cartContainer}>
        <button className={styles.button} onClick={this.handleClick}>
          <span>购物车 2 (件)</span>
        </button>
        <div className={styles.cartDropDown} style={{ display: this.state.isOpen ? "block" : "none" }}>
          <ul>
            <li>robot1</li>
            <li>robot2</li>
          </ul>
        </div>
      </div>
    )
  }
}