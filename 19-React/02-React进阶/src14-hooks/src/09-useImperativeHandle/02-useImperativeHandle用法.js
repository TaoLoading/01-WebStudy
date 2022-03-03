import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const HYInput = forwardRef((props, ref) => {
  const inputRef2 = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef2.current.focus()
    }
  }), [inputRef2])

  return <input ref={inputRef2} type="text" />
})

export default function UseImperativeHandleHookDemo() {
  const inputRef = useRef()

  return (
    <div>
      <HYInput ref={inputRef} />
      <button onClick={e => { inputRef.current.focus(); console.log(inputRef) }}>聚焦</button>
    </div>
  )
}
