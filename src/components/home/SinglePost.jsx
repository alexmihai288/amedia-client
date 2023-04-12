import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const SinglePost = ({token,user}) => {
  const postId = useParams()  
  const [message,setMessage] = useState('')

  async function getSinglePost(){
    try{
      setMessage('Loading...')  
     const req = await axios.get(`/posts/${postId.id}`,{
        headers:{
            authorization:`Bearer ${token}`
          }
      })
      if(req.data.ok===false)  
        setMessage(req.data.msg)

    }
    catch(error)
    {
      setMessage('Internal server error')  
      console.log(error)
    }
  }

  useEffect(()=>{
    getSinglePost()
  },[])

  return (
    <p>dmakdsa</p>
  )
}

export default SinglePost