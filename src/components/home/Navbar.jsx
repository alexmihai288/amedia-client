import React from 'react'
import { useState,useRef,useEffect } from 'react'
import LeftSide from './LeftSide'
import { Link } from 'react-router-dom'
import DropDown from './DropDown'
import axios from 'axios'
import Rocket from '../../images/rocket.png'
import DropDownNav from '../home/DropDownNav'

const Navbar = ({user,logged,token,setCreatePostWindow,decodeByUserId,getAllPostsByUserId}) => {

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

          if(req.data.ok===false)
            setMessage(req.data.msg)

          if(req.data.length>0){
            setMessage('')
            setUsers(req.data)
          }
            setTimeout(() => {
              if(req.data.ok===false){
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
                    <LeftSide setCreatePostWindow={setCreatePostWindow} logged={logged}/>
                </div>
            }
            <div className='search&logo w-[100%] sm:w-[] flex items-center gap-4 lg:flex-row-reverse lg:w-[100%] '>
                <div className='input&search lg:mr-auto lg:ml-auto lg:w-[40%] ml-auto mr-auto sm:m-0 relative'>
                  <div className='input-container w-[100%] flex items-center max-w-[600px] relative'>
                    <input className='w-[100%] outline-none px-3 py-1 sm:py-2 rounded-full sm:m-0 sm:text-sm md:text-base lg:text-lg min-w-[180px]' type='text' value={message==='No users found !'? message : searchInput} placeholder={`${message ? message : '@username...'}`} onChange={e=>{
                      setSearchInput(e.target.value); 
                      if(e.target.value===''){
                        setMessage('');
                        setUsers([])
                      }
                    }}/>

                      {users.length>0 ? 
                        <div className='absolute right-1'>
                            <i className="bi bi-x text-xs sm:text-sm md:text-base lg:text-lg text-red-700" onClick={()=>{
                            setSearchInput('')
                            setUsers([])
                              }}>
                            </i>
                        </div>
                        : 
                  
                        <div className='absolute right-1' onClick={searchUsers}>
                          <img src={Rocket}  alt="rocket" className=' w-7 active:-translate-y-24 duration-700'/>
                        </div>
                      }
        
                  </div>
                  {
                      users.length>0 &&
                        <div className='absolute left-0 right-0 ml-auto mr-auto -bottom-30 bg-gray50 z-20 overflow-y-scroll h-fit max-h-32 p-2 max-w-sm rounded-md flex flex-col gap-2'>
                          {
                              users.map(user=><DropDownNav key={user._id} id={user._id} username={user.username} email={user.email} photo={user.photo} decodeByUserId={decodeByUserId} getAllPostsByUserId={getAllPostsByUserId}/>)
                          }
                        </div>
                  }
                </div>
                <div className="hidden xs:flex logo&name gap-1 items-center ml-auto sm:ml-0">
                  <i className="bi bi-circle-fill text-2xl text-pink5"></i>
                  <p className="font-semibold text-base sm:text-lg lg:mr-auto whitespace-nowrap">
                      AMedia app
                      <span className="font-semibold text-pink5"> .</span>
                  </p>
                </div>
            </div>
          
            {logged===true?
            
            <div className='hidden features sm:flex sm:items-center sm:gap-10 ml-5 relative'>
              
              <div className='hidden sm:flex sm:items-center gap-5 mr-auto'>
                  <i className="bi bi-people-fill text-white text-lg"></i>
              </div>
              <div className='profile hover:scale-105 active:scale-95 relative' onClick={SideFunction}>
                  <img src={user.photo} alt='profileImage' className="object-cover rounded-full w-8 h-8 z-20"/>
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