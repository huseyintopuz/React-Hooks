import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Child from './useCallback/Child';
import axios from 'axios'
import './App.css';
import UseContext from './UseContext/UseContext';

function App() {
  const [text, setText] = useState("")
  const [value, setValue] = useState(0)
  const [showNumber, setShowNumber] = useState(true)
  const [data, setData] = useState("")
  const [nicknameInput, setNicknameInput] = useState("")
  const [nickname, setNickname] = useState("")
  const [dataMemo, setDataMemo] = useState("")
  const [dataCallback, setDataCallback] = useState("Just coding...")
  const [toggle, setToggle] = useState(false)

  const show = () => {
    setShowNumber(showNumber => !showNumber)
  }
  const increment = () => {
    setValue(value + 1)
  }
  const decrement = () => {
    setValue(value - 1)
  }
  //useEffect
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        setData(response.data[1].email)
        console.log('api was called')
      })
  }, [])

  //useRef
  const inputRef = useRef(null)

  function change(e) {
    setNicknameInput(inputRef.current.value)
  }

  function resetNickname() {
    setNickname(nicknameInput)
    setNicknameInput("")
    inputRef.current.focus()
  }

  // useMemo
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        setDataMemo(response.data)
        console.log(response)
      })
  }, [])

  const findLongestName = (comments) => {
    if (!comments) return null;

    let longestName = "";
    for (let i = 0; i < comments.length; i++) {
      let currentName = comments[i].name;
      if (currentName.length > longestName.length) {
        longestName = currentName;
      }
    }
    console.log('this was computed')
    return longestName
  }
  const getLongestName = useMemo(() => findLongestName(dataMemo), [dataMemo])

  //useCallback
  const returnComment = useCallback((name) => {
    return dataCallback + name
  }, 
  [dataCallback]
  )

  return (
    <div className="App">
      {showNumber && <h1>Hello</h1>}
      <input className='inputText' style={{}} type="text" onChange={e => setText(e.target.value)}></input>
      <p>{text}</p>
      <h1>{value}</h1>
      <div className="buttons">
        <button onClick={show}>Show and Hide</button>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <h3><span>email:</span> {data}</h3>
      </div>
      <p className='userName'>User name: {nickname}</p>
      <div className='parent'>
        <input type="text" ref={inputRef} value={nicknameInput} onChange={change} />
        <button onClick={resetNickname}>Change</button>
      </div>
      <UseContext />
      <div className='useMemo'>
          <h3>{getLongestName}</h3>
      </div>
      <Child returnComment={returnComment}/>
      <button className='toggle'
      onClick={() => {setToggle(!toggle)}}
      >Toggle</button>
      {toggle && <h2>Toggle</h2>}
    </div>
  );
}

export default App;
