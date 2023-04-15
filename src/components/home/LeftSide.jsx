import React from 'react'
import Rocket from '../../images/rocket.png'

const LeftSide = ({setCreatePostWindow,logged}) => {
  return (
    <div className='leftSide flex flex-col py-10 px-5 h-[100%] bg-gray50 sm:bg-purple15 sm:border-t-2 sm:border-t-gray50'>
      <div className='options flex flex-col gap-5 relative'>
          <div className='friends flex items-center gap-3'>
            <p className="text-textGray sm:text-gray50">Friends</p>
            <i className="bi bi-people-fill text-pink5 text-lg"></i>
          </div>
          <div className='profile flex items-center gap-3'>
            <p className="text-textGray sm:text-gray50">Your profile</p>
            <div className='border-2 border-pink5 rounded-full'>
              <img src='https://media.discordapp.net/attachments/724220064223592541/1092840802721480804/user.jpg?width=662&height=662' alt='profileImage' className="rounded-full w-8 h-8 z-20"/>
            </div>
          </div>
          <div className='settings flex items-center gap-3'>
            <p className='text-textGray sm:text-gray50'>Settings</p>
            <i className="bi bi-sliders text-lg text-pink5"></i>
          </div>
          {logged ? <button className='mt-3 self-start bg-[#3f9ee3] text-white text-sm whitespace-nowrap px-2 py-1 rounded-md' onClick={()=>setCreatePostWindow(true)}>Create a post</button>:          
                    <button className='mt-3 self-start bg-textGray text-white text-sm whitespace-nowrap px-2 py-1 rounded-md'>Create a post</button>}
      </div>

      <div className="logo&name&rocket mt-auto mb-auto ml-auto mr-auto">
          <div className='flex gap-1 items-center'>
            <i className="bi bi-circle-fill text-2xl text-pink5"></i>
              <p className="font-semibold text-lg lg:mr-auto">
                AMedia app
                <span className="font-semibold text-pink5"> .</span>
              </p>
          </div>
          <img src={Rocket} alt='blowing rocket' className='w-32 h-32'/>
      </div>
       

      <div className='T&C sm:text-gray50'>
        <p className='text-xs'>I Agree with <span className='text-[#3f9ee3]'>Terms and Conditions</span></p>
        <p className='text-xs text-center'>© Copyright 2023</p>
      </div>

    </div>
  )
}

export default LeftSide