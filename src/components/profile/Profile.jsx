import React from 'react'

const Profile = ({user}) => {
    const {username,firstName,lastName,email,password,photo,createdAt} = user
    // Convert the timestamp to a Date object
    const createdAtDate = new Date(createdAt)
    // Format the date as YYYY-MM-DD
    const formattedDate = createdAtDate.toISOString().slice(0,10)


    

    
    return (
    <div className='YourProfile bg-gray50 min-h-[100vh] flex font-Karla'>
        <div className='leftSide bg-pink5 flex flex-col py-10 px-5'>
            <p className='font-medium tracking-tight'><span className='text-purple15 font-bold'>W</span>elcome To Your Profile</p>
            <div className='profilePhoto&Names mt-auto mb-auto flex flex-col gap-3'>
                <img src={photo} alt='profileImg' className='w-24 rounded-full object-cover ml-auto mr-auto'/>
                <div className='text-sm text-preWhite ml-auto mr-auto flex flex-col'>
                        <p><span className='border-b-2 border-b-purple15'>username</span>: @{username}</p>
                        <p><span className='border-b-2 border-b-purple15'>account created at</span>: {formattedDate}</p>
                </div>
            </div>
        </div>
        <div className='righSide'>
            pdsa
        </div>
    </div>
  )
}

export default Profile