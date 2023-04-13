import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Post = ({description,imageUrl,createdBy,upVotes,downVotes,_id,user,token}) => {
  
  const [username, setUsername] = useState();
  const [profileImage, setProfileImage] = useState();

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

  const [likes,setLikes] = useState(upVotes ?? [])
  const [dislikes,setDislikes] = useState(downVotes ?? [])

  const [clicked,setClicked] = useState(false);
  
  const [postActioners,setPostActioners] = useState({
    liked:false,
    disliked:false
  })

  useEffect(()=>{
    checkLikedDisliked();
  },[])

  function checkLikedDisliked(){
    likes.forEach(likeId=>{
      if(likeId===user._id){
        setPostActioners(prev=>{
          return {
            ...prev,
            liked:true
          }
        })
      }
    })

    dislikes.forEach(dislikeId=>{
      if(dislikeId===user._id){
        setPostActioners(prev=>{
          return {
            ...prev,
            disliked:true
          }
        })
      }
    })
  }

  function handleLike(){
    if(!postActioners.liked){
      if(!postActioners.disliked){
        setLikes(prevLikes=>{
          return [...prevLikes,user._id];
        })
      }else{
        //toggle disliked
        setDislikes(prevDislikes=>{
          const filteredDislikes = prevDislikes.filter(disId=>disId!==user._id);
          return filteredDislikes;
        })
        setLikes(prevLikes=>{
          return [...prevLikes,user._id];
        })
      }
    }else{
      setLikes(prevLikes=>{
        const filteredLikes = prevLikes.filter(likeId=>likeId!==user._id);
        return filteredLikes;
      })
    }
  }
  function handleDislike(){
    if(!postActioners.disliked){
      if(!postActioners.liked){
        setDislikes(prevDis=>{
          return [...prevDis,user._id];
        })
      }else{
        setLikes(prevLikes=>{
          const filteredLikes = prevLikes.filter(likeId=>likeId!==user._id);
          return filteredLikes;
        })
        setDislikes(prevDis=>{
          return [...prevDis,user._id];
        })
      }
    }else{
      setDislikes(prevDislikes=>{
        const filteredDislikes = prevDislikes.filter(disId=>disId!==user._id);
        return filteredDislikes;
      })
    }
  }

  useEffect(()=>{
    if(clicked)
      updateVote()
  },[likes,dislikes])

  async function updateVote(){
    try {
      const req = await axios.patch(`/posts/${_id}`,{upVotes:[...likes],downVotes:[...dislikes]},{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
    }catch (error){
     console.log(error) 
    }
  }


  return (
    <div className='post'>
        <Link to={`/posts/${_id}`} className='postImage relative cursor-pointer' >
          <img src={imageUrl} alt='postImage' className='image w-full h-fit'/>
          <div className='absolute -top-5 -left-5 flex flex-col gap-1'>
            <img src={profileImage? profileImage : 'loading'} alt='profileImage' className='w-8 rounded-full'/>
            <p className='ml-8 postUser text-xs text-white'>@{user.username}</p>
          </div>
        </Link>
        <p className='text-sm ml-5'>{description}</p>
        <div className='flex items-center justify-center text-lg px-4 mt-5'>
        {user._id===createdBy && <button className='bg-[#3f9ee3] text-sm px-2 py-0.5 rounded-full text-white tracking-tighter mr-auto'>Edit</button>}
          <div className='votes flex items-center gap-8 ml-auto mr-auto'>
            <div className='upVote flex items-center gap-1'>
              {!postActioners.liked ? 
               <i className="bi bi-caret-up" onClick={()=>{
                handleLike()
                setPostActioners(prev=>{
                  return {
                    disliked:false,
                    liked:!prev.liked
                  }
                })
                setClicked(true);
              }}></i>:
              <i className="bi bi-caret-up-fill" onClick={()=>{
                handleLike()
                setPostActioners(prev=>{
                  return {
                    disliked:false,
                    liked:!prev.liked
                  }
                })
                setClicked(true);
              }}></i>
              }
             
              <p className='text-sm text-textGray tracking-tighter'>{likes.length}</p>
            </div>
            <div className='downVote flex items-center gap-1'>
              {
                !postActioners.disliked ? <i className="bi bi-caret-down" onClick={()=>{
                  handleDislike()
                  setPostActioners(prev=>{
                    return {
                      liked:false,
                      disliked:!prev.disliked
                    }
                  })
                  setClicked(true);
                }}></i>:<i className="bi bi-caret-down-fill" onClick={()=>{
                  handleDislike();
                  setPostActioners(prev=>{
                    return {
                      liked:false,
                      disliked:!prev.disliked
                    }
                  })
                  setClicked(true);
                }}></i>
              }
           
              <p className='text-sm text-textGray tracking-tighter'>{dislikes.length}</p>
            </div>
          </div>
          <i className="bi bi-share-fill text-base ml-auto"></i>
        </div>
    </div>
  )
}

export default Post