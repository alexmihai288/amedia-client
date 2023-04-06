import React from 'react'
import Navbar from './Navbar'
import LeftSide  from './LeftSide'
import { useState } from 'react'

const Home = () => {
  
  const [shader,setShader] = useState(false)

  return (
    <div className={`font-Karla bg-gray50 ${shader===true ? 'opacity-50' : 'opacity-100'} `}>
      <Navbar setShader={setShader}/>
      <div className='flex gap-1'>
        <div className='leftSide hidden sm:block'>
          <LeftSide />
        </div>
        <div>posts</div>
      </div>
    </div>
  )
}

export default Home