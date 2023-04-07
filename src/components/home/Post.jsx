import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

const Post = ({description,imageUrl,createdBy}) => {
  
  const [username, setUsername] = useState();
  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    async function decodeUsername() {
      try {
        const req = await axios.post('/search/createdBy',{createdBy});
        setUsername(req.data.username)
        setProfileImage(req.data.photo)
      } catch (error) {
        console.log(error);
      }
    }
    decodeUsername();
  }, [createdBy]);



  return (
    <div className='post'>
        <div className='postImage relative'>
          <img src={imageUrl} alt='postImage' className='w-full'/>
          <div className='absolute -top-5 -left-5'>
            <img src={profileImage} alt='profileImage' className='w-8 rounded-full'/>
          </div>
        </div>
        <p className='text-sm ml-5'>{description}</p>
        
    </div>
  )
}

export default Post