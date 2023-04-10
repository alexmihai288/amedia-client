import React from 'react'

const DropDownNav = ({username,email,photo}) => {
  return (
    <div className='bg-white rounded-md flex flex-col p-2'>
      <div className='flex items-center gap-3'>
          <img className='w-5 rounded-full' alt='userPhoto' src={photo}/>
          <p className='text-sm'>{username}</p>
      </div>
      <p className='text-xs text-textGray'>{email}</p>
    </div>
  )
}

export default DropDownNav