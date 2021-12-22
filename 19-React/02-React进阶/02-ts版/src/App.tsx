import React, { useState, useEffect } from 'react'
import logo from "./assets/images/logo.svg";
import Robot from "./components/Robot";
import ShoppingCart from "./components/ShoppingCart";
import styles from './App.module.css'

interface Props { }

interface State {
  robotGallery: any[]
  count: number
}

const App: React.FC = (props) => {
  /**
   * 声明状态
   * 以数组形式声明状态，数组的第一个元素是变量，第二个元素是更新该变量的函数
   */
  const [count, setCount] = useState<number>(0)
  const [robotGallery, setRobotGallery] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  /**
   * 副作用函数，实现与外界交流
   * 传入两个参数，第一个参数是回调函数，第二个参数是数组，数组内是组件的状态列表
   * 当数组内的元素发生变化时，回调函数自动执行
   * 当传入空数组时，相当于在模拟componentDidMount，只会在组件第一次挂载UI时被调用
   */
  useEffect(() => {
    document.title = `点击了${count}次`
  }, [count])

  useEffect(() => {
    // 发送请求
    /* fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setRobotGallery(data)) */

    // 在useEffect中使用async和await
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        setRobotGallery(data)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人</h1>
        <button onClick={() => {
          setCount(count + 1)
        }}>click</button>
        <span>count: {count}</span>
      </div>
      <ShoppingCart />
      {!error || error !== '' && <div>网站错误：{error}</div>}
      {!loading ?
        (<div className={styles.robotList}>
          {
            robotGallery.map((r) => {
              return <Robot key={r.id} id={r.id} name={r.name} email={r.email}></Robot>
            })
          }
        </div>)
        : (<h2>Loading</h2>)
      }
    </div>
  )
}

export default App
