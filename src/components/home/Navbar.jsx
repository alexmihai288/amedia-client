import React from 'react'
import { useState,useRef,useEffect } from 'react'
import LeftSide from './LeftSide'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'
import axios from 'axios'
import Rocket from '../../images/rocket.png'
import DropDownNav from './DropDownNav'

const Navbar = ({user,logged,token}) => {

  //showing or not showing the left side/dropdown
    const [showLeftSide,setShowLeftSide] = useState(false)
    const [showDropDown,setDropDown] = useState(false)
    function SideFunction(){
        setShowLeftSide(true)
        setDropDown(true)
    }
    const LeftDiv = useRef(null)
    const dropDown = useRef(null)
    const handleClickOutside = (event) => {
      if (LeftDiv.current && !LeftDiv.current.contains(event.target)) {
        setShowLeftSide(false)
      }
      if(dropDown.current && !dropDown.current.contains(event.target)){
        setDropDown(false)
      }
    }
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])
  //end here

    const [searchInput,setSearchInput] = useState("");
    const [users,setUsers] = useState([])
    const [message,setMessage] = useState('');    


    async function searchUsers(){
      try {
        setMessage('Loading...')
          const req = await axios.get(`search/username/?username=${searchInput}`,{
            headers:{
              authorization:`Bearer ${token}`
            }
          })
          console.log(req)

          if(req.data.ok===false)
            setMessage(req.data.msg)

          if(req.data.length>0){
            setMessage('')
            setUsers(req.data)
          }
            setTimeout(() => {
              if(req.data.ok===false && req.data.msg!=='No users found !'){
                setSearchInput("")
                setMessage('')
              }
            }, 1500);
          
      }catch(error) {
        console.log(error)
      }
    }

  return (
    <div className='bg-purple15'>
        <div className='px-5 py-3 sm:px-7 sm:py-5 flex items-center justify-between max-w-[1800px] ml-auto mr-auto'>
            <i className='mr-2 bi bi-list text-pink5 text-3xl sm:hidden' onClick={SideFunction}></i>
            { showLeftSide &&
                <div className='z-30 absolute left-0 top-0 bottom-0 sm:hidden bg-gray50 border-r-2 border-textGray' ref={LeftDiv}>
                    <LeftSide/>
                </div>
            }
            <div className='search&logo w-[100%] sm:w-[] flex items-center gap-4 lg:flex-row-reverse lg:w-[100%] '>
                <div className='input&search lg:mr-auto lg:ml-auto lg:w-[40%]'>
                  <div className='w-[100%] flex items-center max-w-[600px] relative'>
                    <input className='w-[100%] outline-none px-3 py-1 sm:py-2 rounded-full' type='text' value={searchInput} placeholder='@username. . .' onChange={e=>{
                      setSearchInput(e.target.value);
                      if(e.target.value===''){
                        setMessage('');
                        setUsers([])
                      }
                    }}/>
                    <div className='absolute right-3' onClick={searchUsers}>
                      <img src={Rocket} alt="rocket" className='w-8' /> 
                    </div>
                    <div className='absolute left-0 right-0 -bottom-5'>
                      {
                        users.length>0 ? <DropDownNav/> : <p>{message}</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="hidden xs:flex logo&name gap-1 items-center">
                  <i className="bi bi-circle-fill text-2xl text-pink5"></i>
                  <p className="font-semibold text-lg lg:mr-auto whitespace-nowrap">
                      AMedia app
                      <span className="font-semibold text-pink5"> .</span>
                  </p>
                </div>
            </div>
          
            {logged===true?
            
            <div className='hidden features md:flex md:items-center md:gap-5 ml-5 relative'>
              <div className='hidden md:block'>
                  <i className="bi bi-people-fill text-white text-lg"></i>
              </div>
              <div className='profile hover:scale-105 active:scale-95 relative' onClick={SideFunction}>
                  <img src='https://media.discordapp.net/attachments/724220064223592541/1092840802721480804/user.jpg?width=662&height=662' alt='profileImage' className="object-cover rounded-full w-8 h-8 z-20"/>
                  <div className='absolute -bottom-3 -right-2'>
                      <i className="bi bi-caret-down-fill text-pink5"></i>
                  </div>
              </div>
              {showDropDown && 
                <div className='dropDown absolute -bottom-16 right-0.5 z-30' ref={dropDown}>
                  <DropDown user={user}/>
                </div>
              }
              
            </div>
            :
            <div className='buttons flex items-center gap-2'>
                <Link to={'/register'} className='bg-pink5 px-3 py-1 rounded-lg text-white'>Register</Link>
                <Link to={'/login'} className='bg-white px-3 py-1 rounded-lg text-pink5'>Login</Link>
            </div>

            }
              
             
        </div>
    </div>
    
  )
}

export default Navbar