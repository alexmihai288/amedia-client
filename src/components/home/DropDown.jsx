import React from 'react'

const DropDown = ({user}) => {
  return (
    <div className='bg-white rounded-md flex flex-col gap-1 whitespace-nowrap w-fit px-1.5 py-1'>
        <div className='connected flex items-center'>
            <i className="bi bi-dot text-[#0cbb52] text-xl"></i>
            <p className='text-sm'>Connected as: <span className='text-textGray'>{user.username}</span></p>
        </div>
        <div className='logOut flex items-center'>
            <i className="bi bi-dot text-white text-xl"></i>
            <p className='text-sm'>LogOut</p>
            <i className="bi bi-box-arrow-right ml-auto text-red-700 cursor-pointer" onClick={()=>{
                localStorage.removeItem('token')
                window.location.reload()
            }}></i>
        </div>
    </div>
  )
}

export default DropDown