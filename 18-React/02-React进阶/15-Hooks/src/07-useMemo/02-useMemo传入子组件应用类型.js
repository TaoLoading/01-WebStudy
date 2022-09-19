import React, { useState, memo, useMemo } from 'react'

const HYInfo = memo((props) => {
  console.log('HYInfo重新渲染')
  return <h2>名字: {props.info.name} 年龄: {props.info.age}</h2>
});

export default function MemoHookDemo02() {
  console.log('MemoHookDemo02重新渲染')
  const [show, setShow] = useState(true)

  // const info = { name: 'TaoLoading', age: 18 }
  const info = useMemo(() => {
    return { name: 'TaoLoading', age: 18 }
  }, [])

  return (
    <div>
      <HYInfo info={info} />
      <button onClick={e => setShow(!show)}>show切换</button>
    </div>
  )
}
