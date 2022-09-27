import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addPersonAction } from '../redux/actions/person'

// 定义UI组件
class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value
    const age = this.ageNode.value * 1
    const personObj = {
      id: uuidv4(),
      name: name,
      age: age
    }
    this.props.addPersonProps(personObj)

    this.nameNode.value = ''
    this.ageNode.value = ''
  }

  render() {
    return (
      <div>
        <h2>Person组件</h2>
        <input type="text" ref={c => this.nameNode = c} placeholder="请输入名称" />
        <input type="text" ref={c => this.ageNode = c} placeholder="请输入年龄" />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {
            this.props.persons.map(item => {
              return <li key={item.id}>{item.name} --- {item.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

// 定义容器组件
export default connect(
  state => ({
    persons: state.persons
  }),
  {
    addPersonProps: addPersonAction
  }
)(Person)
