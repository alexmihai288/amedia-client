import React from 'react'
import Post from '../home/Post'
import moment from 'moment'

const Profile = ({user,posts,token,logged,setEditPost}) => {
    const {username,firstName,lastName,email,password,photo,createdAt} = user
     // Use moment.js to parse the createdAt value and convert it to UTC
     const createdAtDate = moment.utc(createdAt).toDate()
     // Format the date as YYYY-MM-DD
     const formattedDate = createdAtDate.toISOString().slice(0,10)
    //count how many posts user has
    const usersPosts = posts.filter(post=>post.createdBy===user._id)
    
    return (
    <div className='YourProfile bg-gray50 min-h-[100vh] flex font-Karla'>
        <div className='leftSide bg-pink5 flex flex-col py-10 max-h-[100vh] px-5 whitespace-nowrap'>
            <p className='font-medium tracking-tight text-3xl'><span className='text-purple15 font-bold'>W</span>elcome To Your Profile !</p>
            <div className='profile&Names flex flex-col h-[100%] justify-center'>
                <div className='flex flex-col gap-3 mb-auto mt-auto'>
                    <img src={photo} alt='profileImg' className='w-24 rounded-full object-cover mr-auto ml-auto'/>
                    <div className='text-sm text-preWhite ml-auto mr-auto flex flex-col text-center'>
                            <p><span className='underline underline-offset-4 decoration-purple15'>username</span>: @{username}</p>
                            <p><span className='underline underline-offset-4 decoration-purple15'>account created at</span>: {formattedDate}</p>
                    </div>
                </div>
               
                <div className='totals flex flex-col ml-auto gap-0.5 mb-auto'>
                    <div className='totalFriends flex items-center text-preWhite gap-2.5'>
                        <p className='mr-auto tracking-tighter'>Friends</p>
                        <div className='flex items-center gap-2 ml-auto'>
                            <p className='ml-auto'>14</p> 
                            <i className="bi bi-people-fill text-lg"></i>
                        </div>
                    </div>
                    <div className='totalPosts flex items-center text-preWhite gap-2.5'>
                        <p className='mr-auto'>Posts</p>
                        <div className='flex items-center gap-2 ml-auto'>
                            <p className='ml-auto'>{usersPosts.length}</p> 
                            <i className="bi bi-sticky-fill text-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='T&C'>
                <p className='text-xs text-center'>I Agree with <span className='text-purple15'>Terms and Conditions</span></p>
                <p className='text-xs text-center'>© Copyright 2023</p>
            </div>
        </div>
        <div className='rightSide'>
            <p className='font-bold text-center underline underline-offset-4 decoration-pink5 text-2xl bg-pink5 pt-5'>Your posts down here</p>
            <div className='grid grid-cols-1 gap-10 sm:gap-8 sm:px-6 md:grid-cols-2 lg:px-8 lg:grid-cols-3 xl:px-10 py-5 max-h-[100vh] w-[100%] overflow-y-scroll'>
                        {
                            usersPosts ?
                                usersPosts.map(post=>
                                    <div className='p-2 bg-preWhite rounded-md'>
                                        <Post {...post} user={user} token={token} logged={logged} setEditPost={setEditPost}/>
                                    </div>
                                )
                            : 
                            'loading...'
                        }            
            </div>
        </div>
        
    </div>
  )
}

export default Profile