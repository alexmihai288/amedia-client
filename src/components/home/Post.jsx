import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

const Post = ({description,imageUrl,createdBy,user}) => {
  
  const [username, setUsername] = useState();
  const [profileImage, setProfileImage] = useState()


  async function decodeUsername() {
    try {
      const req = await axios.post('/search/createdBy',{createdBy});
      setUsername(req.data.username)
      setProfileImage(req.data.photo)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    decodeUsername();
  }, []);


  return (
    <div className='post'>
        <div className='postImage relative'>
          <img src={imageUrl} alt='postImage' className='w-full'/>
          <div className='absolute -top-5 -left-5'>
            <img src={profileImage} alt='profileImage' className='w-8 rounded-full'/>
          </div>
        </div>
        <p className='text-sm ml-5'>{description}</p>
        <p>{username}</p>
        <div className='flex items-center justify-center gap-8 text-lg px-4 mt-5'>
        {user._id===createdBy && <button className='bg-[#3f9ee3] text-sm px-2 py-0.5 rounded-full text-white tracking-tighter'>Edit</button>}
          <div className='votes ml-auto flex items-center gap-8'>
            <i className="bi bi-caret-up"></i>
            <i className="bi bi-caret-down"></i>
          </div>
          <i className="bi bi-share-fill text-base ml-auto"></i>
        </div>
    </div>
  )
}

export default Post