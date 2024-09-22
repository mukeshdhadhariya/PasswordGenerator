import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const [numbera,setNumbera]=useState(false)
  const [chara,setChara]=useState(false)
  const [password,setPassword]=useState("")

  const passwordref=useRef(null)

  const passwordgenrator=useCallback(()=>{

    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numbera) str+="0123456789"
    if(chara) str+="~!@#$%^&*(){}[]+=-_"


    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char)
    }

    setPassword(pass)

  },[length,numbera,chara,setPassword])


  useEffect(()=>{
    passwordgenrator()
  },[length,numbera,chara,passwordgenrator])
  

  // const copy=()=>{
  //   window.navigator.clipboard.writeText(password)
  //   console.log(password);
  // }

  const copy=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)

  },[password])

  return (
    <>
    <div className='w-full max-w-md mx-auto px-4 py-3 my-8 text-orange-700 shadow-md  rounded-lg bg-blue-200'>
    <h1 className=' text-2xl mb-3 text-center text-white'>Password generator</h1>
      <div className='flex shadow rounded-lg  overflow-hidden mb-4'>
        
        <input
        type='text'
        value={password}
        className='outline-none  w-full py-3 px-3'
        placeholder='password'
        readOnly
        ref={passwordref}
        />
        <button onClick={copy} className='text-white px-4 outline-none shrink-0 bg-blue-700  hover:bg-blue-800'>copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length :{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numbera}
          id="numberinput"
          onChange={()=>{
            setNumbera((prev)=>!prev)
          }}
          />
          <label htmlFor='numberinput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={chara}
          id="charinput"
          onChange={()=>{
            setChara((prev)=>!prev)
          }}
          />
          <label htmlFor='charinput'>Characters</label>
        </div>

      </div>

    </div>
    </>
  )
}

export default App
