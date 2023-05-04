import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Post from '../home/Post'
import axios from 'axios'

const UserProfile = ({searchedUser,searchedUserPosts,token,logged,setEditPost,user}) => {

    const {username,photo,createdAt,_id,friendsRequest} = searchedUser
     // Use moment.js to parse the createdAt value and convert it to UTC
     const createdAtDate = moment.utc(createdAt).toDate()
     // Format the date as YYYY-MM-DD
     const formattedDate = createdAtDate.toISOString().slice(0,10)
    //count how many posts user has
    const usersPosts = searchedUserPosts.filter(post=>post.createdBy===searchedUser._id)
    

    const [friendsRequestState,setfriendsRequestState] = useState(friendsRequest ?? [])
    const [clicked,setClicked] = useState(false)
    const [message,setMessage] = useState('')

    const handleFriendRequests=()=>{
        setfriendsRequestState(prevState=>{
            return [...prevState,user._id]
        })
        setClicked(true)
    }

    const clearing = ()=>{
        setMessage('')
    }
    const updateFriendRequest= async()=>{
        try{
            setMessage('Sending friend request...')
            const req = await axios.patch(`/user/${_id}`,{friendsRequest:[...friendsRequestState]},
                {
                    headers: {
                    authorization: `Bearer ${token}`,
                    },
                }
            )
            setMessage('Friend request succeded !')

            setTimeout(() => {
                clearing()
            }, 500);
            console.log(req)
        }catch(error){
            console.log(error)
            setMessage('Internal server error')
        }
    }

    useEffect(()=>{
        if(clicked===true)
        {
            updateFriendRequest()
        }
    },[clicked])
   

    return (
    <div className='YourProfile bg-gray50 min-h-[100vh] flex font-Karla'>
        <div className='leftSide bg-purple15 flex flex-col pb-5 pt-5 max-h-[100vh] px-5 whitespace-nowrap'>
            <p className='font-medium tracking-tight text-3xl text-gray50'>Welcome To {username}'s profile' !</p>
            <div className='profile&Names flex flex-col h-[100%] justify-center'>
                <div className='flex flex-col gap-3 mb-auto mt-auto'>
                    <img src={photo} alt='profileImg' className='w-28 h-28 rounded-full object-cover mr-auto ml-auto'/>
                    <div className='text-sm text-preWhite ml-auto mr-auto flex flex-col text-center'>
                            <p><span className='underline underline-offset-4 decoration-pink5'>username</span>: @{username}</p>
                            <p><span className='underline underline-offset-4 decoration-pink5'>account created at</span>: {formattedDate}</p>
                            {user._id !==searchedUser._id ? <button className='addFriend bg-pink5 self-center px-2 py-1 rounded-md mt-3 active:scale-95 duration-75' onClick={()=>handleFriendRequests()}>Add Friend</button> : ""}
                            <p>{message}</p>
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
            <div className='T&C text-gray50'>
                <p className='text-xs text-center'>I Agree with <span className='text-[#3f9ee3]'>Terms and Conditions</span></p>
                <p className='text-xs text-center'>© Copyright 2023</p>
            </div>
        </div>
        {usersPosts.length>0 ? <div className='rightSide'>
            <p className='font-bold text-center underline underline-offset-8 decoration-pink5 text-2xl bg-purple15 pt-5 pb-5 text-pink5'>Posts down here <span><i className="text-base bi bi-arrow-down text-preWhite"></i></span></p>
            <div className='grid grid-cols-1 max-h-[calc(100vh-72px)] gap-10 sm:gap-8 sm:px-6 md:grid-cols-2 lg:px-8 lg:grid-cols-3 xl:px-10 py-5 w-[100%] overflow-y-scroll'>
                        {
                            usersPosts ?
                                usersPosts.map(post=>
                                    <div className='p-2 bg-preWhite rounded-md'>
                                        <Post {...post} user={searchedUser} token={token} logged={logged} setEditPost={setEditPost} userLogged={user}/>
                                    </div>
                                )
                            : 
                            'loading...'
                        }            
            </div>
        </div>
        :
        <p>No posts yet !</p>    
    }
        
        
    </div>
  )
}

export default UserProfile