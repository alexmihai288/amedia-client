import React from 'react'
import { useNavigate } from 'react-router-dom'

const DropDownNav = ({id,username,email,photo,decodeByUserId,getAllPostsByUserId}) => {
  const navigate = useNavigate()

  return (
    <div className='bg-white rounded-md flex flex-col p-2'>
        <div className='flex items-center gap-3'>
          <img className='w-8 h-8 rounded-full' alt='userPhoto' src={photo}/>
          <p className='text-sm'>{username}</p>
        </div>
        <p className='text-xs text-textGray'>{email}</p>
        <button className='bg-pink5 text-preWhite self-end px-3 py-1 rounded-md text-sm' onClick={()=>{
          decodeByUserId(id)
          getAllPostsByUserId(id)
          setTimeout(() => {
            navigate(`/profile/${id}`)
          }, 200);
        }}>View Profile</button>
    </div>
  )
}

export default DropDownNav