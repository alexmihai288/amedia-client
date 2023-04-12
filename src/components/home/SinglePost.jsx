import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = ({ token, user }) => {
  const postId = useParams();
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({});

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

  useEffect(() => {
    if (postLoaded) decodeUsername();
  }, [postLoaded]);

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const [clicked, setClicked] = useState(false);

  const [postActioners, setPostActioners] = useState({
    liked: false,
    disliked: false,
  });

  useEffect(() => {
    if (postLoaded) {
      setLikes(post.upVotes);
      setDislikes(post.downVotes);
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

  return (
    <div>
      {message ? (
        message
      ) : (
        <div className="min-h-[100vh] max-h-[100vh] bg-gray50 flex items-center justify-center gap-1">
          <div className="flex gap-1">
            <div className="post bg-white p-2 rounded-tl-md rounded-bl-md">
              <img src={post.imageUrl} alt="postImage" className="rounded-md" />
              <p className="text-sm ml-5">{post.description}</p>
              <div className="flex items-center justify-center text-lg px-4 mt-5">
                {user._id === post.createdBy && (
                  <button className="bg-[#3f9ee3] text-sm px-2 py-0.5 rounded-full text-white tracking-tighter mr-auto">
                    Edit
                  </button>
                )}
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
            </div>
            <div className="commentSection bg-white rounded-tr-md rounded-br-md p-2 flex flex-col gap-2 w-[100%]">
              <p className="text-3xl font-semibold">Comments:364</p>

              <div className="comments flex flex-col border-2 border-pink5 max-h-[calc(100%-112px)] h-[calc(100%-112px)] overflow-y-scroll gap-2 p-2">
                <div className="flex items-center gap-2 bg-gray50 p-1 rounded-md">
                  <div className="profile&name flex items-center gap-1">
                    <img src={user.photo}  alt="profilePhoto" className="w-6 rounded-full"/>
                    <p className="text-sm">{user.username}:</p>
                  </div>
                  <div className="comment">
                    <p className="text-xs">comment</p>
                  </div>
                </div>
              </div>

              <div className="postComment flex items-center gap-2 ml-auto mr-auto mt-auto mb-auto">
                <input className="border-b-2 border-pink5 outline-none"/>
                <button className="postComment bg-[#3f9ee3] text-sm text-white tracking-tighter px-2 py-0.5 rounded-full">Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
