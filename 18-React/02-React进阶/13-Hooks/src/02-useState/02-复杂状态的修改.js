import React, { useState } from 'react'

export default function ComplexHookState() {

  const [friends, setFriends] = useState(['xiaoming', 'xiaohong'])
  const [students, setStudents] = useState([
    { id: 110, name: 'why', age: 18 },
    { id: 111, name: 'xiaoming', age: 30 },
    { id: 112, name: 'xiaohong', age: 25 },
  ])

  function addFriend() {
    friends.push('hmm')
    setFriends(friends)
  }

  function incrementAgeWithIndex(index) {
    const newStudents = [...students]
    newStudents[index].age += 1
    setStudents(newStudents)
  }

  return (
    <div>
      <h2>好友列表:</h2>
      <ul>
        {
          friends.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
      <button onClick={e => setFriends([...friends, 'tom'])}>添加朋友</button>
      {/* 错误的做法 */}
      <button onClick={addFriend}>添加朋友</button>

      <h2>学生列表</h2>
      <ul>
        {
          students.map((item, index) => {
            return (
              <li key={item.id}>
                <span>名字: {item.name} 年龄: {item.age}</span>
                <button onClick={e => incrementAgeWithIndex(index)}>age+1</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
