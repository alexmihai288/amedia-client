import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FriendReqs = ({friendsRequest}) => {
    const navigate = useNavigate()


    const [decodedNotUser,setDecodedNotUser] = useState([]) 
    const [message,setMessage] = useState('')

    async function decodeAllFriendsRequests() {
        try {
          setMessage('Loading...')
          const requests = friendsRequest.map((request) =>
            axios.get(`/search/decodeByUserId/${request}`)
          )
          const responses = await Promise.all(requests)
          const decodedUsers = responses
            .filter((res) => res.data.ok === true)
            .map((res) => res.data.user)
          setDecodedNotUser((prevState) => [...prevState, ...decodedUsers])
        } catch (error) {
          setMessage('Internal server error')
          console.log(error)
        }
        setTimeout(()=>{
            setMessage('')
        },500)
      }
      
      useEffect(() => {
        decodeAllFriendsRequests()
      }, [])


    console.log(decodedNotUser)

    return(
        <div className='flex flex-col gap-3'>
            {message!=='' ? <p className='text-sm text-textGray'>{message}</p> :  decodedNotUser.map(user=>{
                return <div className='flex items-center'>
                    <div className='flex items-center gap-1' onClick={()=>navigate(`/profile/${user._id}`)}>
                        <img className='rounded-full w-8 h-8' src={user.photo} alt='profilePhoto'/>
                        <p className='text-sm'>{user.username}</p>
                    </div>
                    <p className='ml-5 text-xs text-textGray'>Sent you a friend request</p>
                </div>
            })}
           
        </div>
    )
}

export default FriendReqs