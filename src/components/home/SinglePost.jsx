import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {nanoid} from "nanoid"
import { useNavigate } from "react-router-dom";

const SinglePost = ({ token, user,EditPost}) => {
  const postId = useParams();
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({});
  const [usersComments,setUsersComments] = useState([])

  const [postLoaded, setPostLoaded] = useState(false);

  async function getSinglePost() {
    try {
      setMessage("Loading...");
      const req = await axios.get(`/posts/${postId.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (req.data.ok === false) setMessage(req.data.msg);
      if (req.data.ok === true) {
        setMessage("");
        setPost(req.data.post);
      }
      setPostLoaded(true);
    } catch (error) {
      setMessage("Internal server error");
      console.log(error);
    }
  }

  useEffect(() => {
    getSinglePost();
  }, []);

  const [username, setUsername] = useState();
  const [profileImage, setProfileImage] = useState();

  async function decodeUsername() {
    try {
      const req = await axios.post("/search/createdBy", {
        createdBy: post.createdBy,
      });
      setUsername(req.data.username);
      setProfileImage(req.data.photo);
      console.log(req);
    } catch (error) {
      console.log(error);
    }
  }

  const [commentMsg,setCommentMsg] = useState('')
  async function decodeUserInComment(userInComment,commentText){
    setCommentMsg('Loading...')
    try {
      const req = await axios.get(`/search/decodeByUserId/${userInComment}`)
      if(req.data.ok===true){
        setCommentMsg('')
        setUsersComments(prevComments=>{
          return[
            ...prevComments,
            {
              id:nanoid(),
              userId:req.data.user,
              comment:commentText
            }
          ]
        })
      }
      if(req.data.ok===false)
        setCommentMsg(req.data.msg)
    }catch (error){
      setCommentMsg('Internal server error')
      console.log(error)
    }
  }

  useEffect(() => {
    if (postLoaded && post.comments) {
      decodeUsername();
      post.comments.forEach((comment) => {
        if (comment && comment.userId && comment.comment) {
          decodeUserInComment(comment.userId, comment.comment);
        }
      });
    }
    
  }, [postLoaded])

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const [clicked, setClicked] = useState(false);

  const [postActioners, setPostActioners] = useState({
    liked: false,
    disliked: false,
  });

  useEffect(() => {
    if (postLoaded) {
      setLikes(post.upVotes ?? []);
      setDislikes(post.downVotes ?? []);
    }
  }, [postLoaded]);

  useEffect(() => {
    checkLikedDisliked();
  }, [likes, dislikes]);

  function checkLikedDisliked() {
    likes.forEach((likeId) => {
      if (likeId === user._id) {
        setPostActioners((prev) => {
          return {
            disliked: false,
            liked: true,
          };
        });
      }
    });

    dislikes.forEach((dislikeId) => {
      if (dislikeId === user._id) {
        setPostActioners((prev) => {
          return {
            liked: false,
            disliked: true,
          };
        });
      }
    });
  }

  function handleLike() {
    if (!postActioners.liked) {
      if (!postActioners.disliked) {
        setLikes((prevLikes) => {
          return [...prevLikes, user._id];
        });
      } else {
        //toggle disliked
        setDislikes((prevDislikes) => {
          const filteredDislikes = prevDislikes.filter(
            (disId) => disId !== user._id
          );
          return filteredDislikes;
        });
        setLikes((prevLikes) => {
          return [...prevLikes, user._id];
        });
      }
    } else {
      setLikes((prevLikes) => {
        const filteredLikes = prevLikes.filter((likeId) => likeId !== user._id);
        return filteredLikes;
      });
    }
  }
  function handleDislike() {
    if (!postActioners.disliked) {
      if (!postActioners.liked) {
        setDislikes((prevDis) => {
          return [...prevDis, user._id];
        });
      } else {
        setLikes((prevLikes) => {
          const filteredLikes = prevLikes.filter(
            (likeId) => likeId !== user._id
          );
          return filteredLikes;
        });
        setDislikes((prevDis) => {
          return [...prevDis, user._id];
        });
      }
    } else {
      setDislikes((prevDislikes) => {
        const filteredDislikes = prevDislikes.filter(
          (disId) => disId !== user._id
        );
        return filteredDislikes;
      });
    }
  }

  useEffect(() => {
    if (clicked) updateVote();
  }, [likes, dislikes]);

  async function updateVote() {
    try {
      const req = await axios.patch(
        `/posts/${post._id}`,
        { upVotes: [...likes], downVotes: [...dislikes] },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  const commentInput = useRef();

  async function handleComment(){
    try{
      const req = await axios.patch(`/posts/${post._id}`,{comments:[...usersComments,{userId:user._id,comment:commentInput.current.value}]},{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      setUsersComments(prev=>{
        return [...prev,{
          userId:user,
          comment:commentInput.current.value
        }]
      })
    }catch(err){
      console.log(err);
    }
  }

  const [descriptionWnw,setDescriptionWnd] = useState(false)
  const descUpdInput = useRef()
  const [updMsg,setUpdMsg] = useState('')

  const [DeletePostWindow,setDeletePostWindow] = useState(false)

  const nav = useNavigate()
  return (
    <div>
      {message ? (
        message
      ) : (
        <div className="min-h-[100vh] max-h-[100vh] bg-gray50 flex items-center justify-center gap-1 px-10 py-5 sm:px-20 font-Karla">
          <div className="flex flex-col sm:flex-row gap-1">
            <div className="post bg-white p-2 rounded-tl-md rounded-bl-md relative">
              <img src={post.imageUrl} alt="postImage" className="rounded-md object-cover h-96 sm:max-h-[850px]" />
              <div className="flex items-center gap-2 mt-1 relative">
                <p className="text-sm ml-5">{post.description}</p>
                {EditPost && 
                  <button className="bg-pink5 text-white text-xs px-1 py-1 rounded-lg tracking-tighter" onClick={()=>setDescriptionWnd(true)}>Edit description</button> 
                }
                {
                  descriptionWnw && <div className="absolute left-[15%] bottom-10 bg-white p-3 rounded-md">
                    <div className="flex flex-col">
                      <p className="text-sm bg-textGray px-1 py-0.5">Change description</p>
                      <input className="outline-none text-xs bg-gray50 py-2 px-1" ref={descUpdInput}/>
                      <button className="bg-[#3f9ee3] text-white px-1 py-0.5 rounded-xl tracking-tighter self-center mt-1 text-xs" onClick={async ()=>{
                          if(descUpdInput==='')
                            setUpdMsg('This field cannot be empty !')
                          else
                          {
                            try{
                              setUpdMsg('Loading...')
                              await axios.patch(`/posts/${post._id}`,{description:descUpdInput.current.value},{
                                headers:{
                                  authorization:`Bearer ${token}`
                                }
                              })
                              setUpdMsg('Description successfully updated !')
                              setPost(prevPost=>{
                                return{
                                  ...prevPost,
                                  description:descUpdInput.current.value
                                }
                              })
                            }
                            catch(error){
                              setUpdMsg('Internal server error...')
                              console.log(error)
                            }
                          }
                          setTimeout(() => {
                            setUpdMsg('')
                            setDescriptionWnd(false)
                          }, 1000);
                        
                      }}>OK</button>
                      <p className={`${updMsg==='Description successfully updated !' ? 'text-green-700' : updMsg==='Loading...' ? 'text-black' : 'text-red-700'} text-sm text-center`}>{updMsg}</p>
                    </div>
                    <i className="bi bi-x text-red-700 ml-auto mr-5 cursor-pointer absolute -top-1.5 -right-5" onClick={()=>setDescriptionWnd(false)}></i>
                  </div>
                }
              </div>
              <div className="flex items-center justify-center text-lg px-4 mt-5">
                <div className="votes flex items-center gap-8 ml-auto mr-auto">
                  <div className="upVote flex items-center gap-1">
                    {!postActioners.liked ? (
                      <i
                        className="bi bi-caret-up"
                        onClick={() => {
                          handleLike();
                          setPostActioners((prev) => {
                            return {
                              disliked: false,
                              liked: !prev.liked,
                            };
                          });
                          setClicked(true);
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-caret-up-fill"
                        onClick={() => {
                          handleLike();
                          setPostActioners((prev) => {
                            return {
                              disliked: false,
                              liked: !prev.liked,
                            };
                          });
                          setClicked(true);
                        }}
                      ></i>
                    )}

                    <p className="text-sm text-textGray tracking-tighter">
                      {likes.length}
                    </p>
                  </div>
                  <div className="downVote flex items-center gap-1">
                    {!postActioners.disliked ? (
                      <i
                        className="bi bi-caret-down"
                        onClick={() => {
                          handleDislike();
                          setPostActioners((prev) => {
                            return {
                              liked: false,
                              disliked: !prev.disliked,
                            };
                          });
                          setClicked(true);
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-caret-down-fill"
                        onClick={() => {
                          handleDislike();
                          setPostActioners((prev) => {
                            return {
                              liked: false,
                              disliked: !prev.disliked,
                            };
                          });
                          setClicked(true);
                        }}
                      ></i>
                    )}

                    <p className="text-sm text-textGray tracking-tighter">
                      {dislikes.length}
                    </p>
                  </div>
                </div>
                <i className="bi bi-share-fill text-base ml-auto"></i>
              </div>
              {EditPost && <i className="bi bi-x text-red-700 ml-auto mr-5 cursor-pointer -top-1.5 -right-5 absolute sm:hidden" onClick={()=>setDeletePostWindow(true)}></i>}
              
            </div>
            <div className="commentSection bg-white rounded-tr-md rounded-br-md p-2 flex flex-col gap-2 w-[100%] relative">
              <p className="text-3xl font-semibold">Comments:{usersComments.length}</p>
          
                  <div className="comments flex flex-col border-2 border-pink5 h-48 sm:max-h-[calc(100%-112px)] overflow-y-scroll gap-2 p-2">
                  {commentMsg ? commentMsg :
                        usersComments.map(userComment=>{
                        return <div  className="flex items-center gap-2 bg-gray50 p-1 rounded-md">
                          <div className="profile&name flex items-center gap-1">
                            <img src={userComment.userId.photo}  alt="profilePhoto" className="w-6 rounded-full"/>
                            <p className="text-sm font-semibold">{userComment.userId.username}:<span className="text-xs ml-1">{userComment.userId._id===user._id ? '(you)' : ''}</span></p>
                          </div>
                          <div className="comment">
                            <p className="text-xs">{userComment.comment}</p>
                          </div>
                          {EditPost && <i className="bi bi-x text-red-700 ml-auto mr-5 cursor-pointer" onClick={async()=>{
                            try{
                              await axios.patch(`/posts/${post._id}`,{comments:usersComments.filter(com=>com.id!==userComment.id)},{
                                headers:{
                                  authorization:`Bearer ${token}`
                                }
                              })
                              setUsersComments(prevState => prevState.filter(com => com.id !== userComment.id));
                            }catch(error){
                              console.log(error)
                            }
                          }}></i>}
                      </div>
                      })
                  }
                  
                </div>
             

              <div className="postComment flex items-center gap-2 ml-auto mr-auto mt-auto mb-auto">
                <input ref={commentInput} className="border-b-2 border-pink5 outline-none"/>
                <button onClick={()=>{
                  handleComment()
                  setTimeout(() => {
                    commentInput.current.value=''
                  }, 1000);
                  }} className="postComment bg-[#3f9ee3] text-sm text-white tracking-tighter px-2 py-0.5 rounded-full">Comment</button>
              </div>
              {EditPost && <i className="bi bi-x text-red-700 ml-auto mr-5 cursor-pointer -top-1.5 -right-5 absolute hidden sm:block" onClick={()=>{
                setDeletePostWindow(true)
              }}></i>}
              
            </div>
          </div>
        </div>
      )}
      {DeletePostWindow  && 
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(30,30,30,0.3)] z-20 flex items-center justify-center">
            <div className="bg-gray50 rounded-md px-2.5 py-1">
              <div className="flex flex-col">
                  <i className="bi bi-x text-red-700 ml-auto" onClick={()=>{
                    setDeletePostWindow(false)
                  }}></i>
                  <p className="font-semibold">Are you sure you want to delete the post ?</p>
                  <div className="buttons flex items-center gap-1 ml-auto text-sm mt-5">
                    <button className="bg-red-700 text-white px-2 py-0.5 rounded-md" onClick={async()=>{
                        try{
                          await axios.delete(`/posts/${post._id}`,{headers:
                          {
                            authorization:`Bearer ${token}`
                          }})
                          nav('/')
                          
                        }catch(error){
                          console.log(error)
                        } 
                    }}>Delete</button>
                    <button className="bg-pink5 text-white px-2 py-0.5 rounded-md" onClick={()=>setDeletePostWindow(false)}>Cancel</button>
                  </div>
              </div>
                
            </div>
          </div>
      }
      
    </div>
  );
};

export default SinglePost;

/***/