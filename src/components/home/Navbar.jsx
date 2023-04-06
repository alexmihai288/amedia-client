import React from 'react'
import { useState,useRef,useEffect } from 'react'
import LeftSide from './LeftSide'

const Navbar = ({setShader}) => {


  

  //showing or not showing the left side
  const [showLeftSide,setShowLeftSide] = useState(false)
  function LeftSideFunction(){
      setShowLeftSide(true)
  }
  const LeftDiv = useRef(null)
  const handleClickOutside = (event) => {
    if (LeftDiv.current && !LeftDiv.current.contains(event.target)) {
      setShowLeftSide(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='bg-purple15'>
        <div className='px-7 py-5 flex items-center justify-between max-w-[1600px] ml-auto mr-auto'>
            <i className='bi bi-list text-pink5 text-3xl sm:hidden ' onClick={LeftSideFunction}></i>
            { showLeftSide &&
                <div className='absolute left-0 top-0 bottom-0 sm:hidden bg-gray50' ref={LeftDiv}>
                    <LeftSide/>
                </div>
            }
            <div className='search&logo flex items-center gap-4 lg:flex-row-reverse lg:w-[100%]'>
                <input className='outline-none px-3 py-2 rounded-full lg:mr-auto lg:ml-auto lg:w-[40%]' type='text' placeholder='@username. . .'/>
                <div className="logo&name flex gap-1 items-center">
                <i className="bi bi-circle-fill text-2xl text-pink5"></i>
                <p className="font-semibold text-lg lg:mr-auto">
                    AMedia app
                    <span className="font-semibold text-pink5"> .</span>
                </p>
                </div>
            </div>
            <div className='hidden features sm:flex sm:items-center sm:gap-5'>
                <div className='hidden md:block'>
                    <i className="bi bi-people-fill text-white text-lg"></i>
                </div>
                <div className='profile hover:scale-105 active:scale-95 relative'>
                    <img src='https://media.discordapp.net/attachments/724220064223592541/1092840802721480804/user.jpg?width=662&height=662' alt='profileImage' className="rounded-full w-8 h-8 z-20"/>
                    <div className='absolute -bottom-3 -right-2'>
                        <i className="bi bi-caret-down-fill text-pink5"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar