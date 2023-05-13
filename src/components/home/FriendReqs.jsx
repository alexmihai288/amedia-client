import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FriendReqs = ({user,token,searchedUser}) => {
    const {friendsRequest} = user
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


      //accept friend reqs
    let afterAccept = []
    const [friendState,setFriendsState] = useState(user.friends || [])
    const [OktoAccept,setOktoAccept] = useState(false)
    const handleAcceptFriendRequest = ()=>{
        setFriendsState(prevState=>{
            return [...prevState,searchedUser]
        })
        if(user.friendsRequest){
          afterAccept = user.friendsRequest.filter(frdReq=>frdReq!==searchedUser)
        }
        setOktoAccept(true)
    }

    useEffect(()=>{
        if(OktoAccept===true){
            AcceptFriendRequest()
        }
    },[OktoAccept])

    const updateFriendsReq = async()=>{
        const req = await axios.patch(`user/${user._id}`,{friendsRequest:[...afterAccept]},
        {
            headers: {
            authorization: `Bearer ${token}`,
            },
        }
      )
    }
    const AcceptFriendRequest= async()=>{
        try{
            const req = await axios.patch(`user/me/${user._id}`,{friends:[...friendState]},
                {
                    headers: {
                    authorization: `Bearer ${token}`,
                    },
                }
            )
            if(req.data.ok===true)
            {
              updateFriendsReq()
            }
        }catch(error){
           console.log(error) 
        }
    }

    return(
        <div className='flex flex-col gap-3'>
            {message!=='' ? <p className='text-sm text-textGray'>{message}</p> :  decodedNotUser.map(user=>{
                return <div className='flex items-center'>
                    <div className='flex items-center gap-1' onClick={()=>navigate(`/profile/${user._id}`)}>
                        <img className='rounded-full w-8 h-8' src={user.photo} alt='profilePhoto'/>
                        <p className='text-sm'>{user.username}</p>
                    </div>
                    <p className='ml-5 text-xs text-textGray'>Sent you a friend request</p>
                    <div className='ml-2 buttons flex items-center gap-1'>
                        <button className='bg-green-700 text-xs text-white px-2 py-1 rounded-md active:scale-95 duration-75' onClick={()=>handleAcceptFriendRequest()}>Accept</button>
                        <button className='bg-red-700 text-xs text-white px-2 py-1 rounded-md active:scale-95 duration-75'>Decline</button>
                    </div>
                </div>
            })}
           
        </div>
    )
}

export default FriendReqs