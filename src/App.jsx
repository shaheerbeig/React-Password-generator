import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  
  const [length , setLength] = useState(8);
  const [numberUsed , setNumber ] = useState(false);
  const [specialCharacterUsed , setCharacter] = useState(false);
  const [password , setpassword] = useState("");

  let passwordreference = useRef(null);


  //password generator function
  const passwordGenerator = useCallback(() => {

    let password = "";
    let string = "ABCDEFGHIJKLMNAOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberUsed) {
      string += "0123456789";
    }

    if(specialCharacterUsed){
      string += "!@#$%^&*(){}[]";
    }
    for (let index=1 ; index<=length ; index++){
        let varindex = Math.floor(Math.random() * string.length + 1);
        password += string.charAt(varindex);
    }

    setpassword(password);

  }, [numberUsed , specialCharacterUsed , length , setpassword])

  
  useEffect(() => {
    passwordGenerator();
  } , [length,passwordGenerator,numberUsed,specialCharacterUsed])

  //copying password to clipboard
  const copyText =() => {
    passwordreference.current?.select();
    window.navigator.clipboard.writeText(password);
  }
    
    return (
    <>
    <div className='w-full max-w-md mx-auto  rounded-lg px-4 py-3 my-9 bg-gray-800'>
      <h3 className='text-white text-center'>Generate Password</h3>
      <div className='relative shadow rounded-lg overflow-hidden mb-4 my-3'>
        <input
          type='text'
          value={password}
          readOnly
          placeholder='Password'
          className='w-full py-1 px-3 pr-16 rounded-lg outline-none'
          ref={passwordreference}
        />
        <button className='absolute right-0 top-0 bg-blue-800 text-white px-4 py-1 rounded-lg outline-none' onClick={copyText}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-4'>
        <div className='flex gap-x-1 items-center text-white'>
          <input 
          type='range'
          min={8}
          max={50}
          value={length}
          onChange={(e) => {  
            setLength(e.target.value)
          }}
          className='cursor-pointer'
          />
          <label >Length: {length}</label>
        </div>
        <div className='flex gap-x-1 items-center text-white'>
          <input 
          defaultChecked={numberUsed}
          type='checkbox'
          onChange={() => {
            setNumber((prev) => !prev)
          }}
          className='cursor-pointer'
          />
          <label >Numbers</label>
        </div>
        <div className='flex gap-x-1 items-center text-white'>
          <input 
          type='checkbox'
          defaultChecked={specialCharacterUsed}
          onChange={() => {
            setCharacter((prev) => !prev)
          }}
          className='cursor-pointer'
          />
          <label >Characters </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
