import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Friends = (user) => {
  const { friends } = user.user;
  const [friendsState, setFriendsState] = useState([]);
  const [message, setMessage] = useState("");

  async function decodeByUserId(id) {
    try {
      setMessage("Loading...");
      const req = await axios.get(`/search/decodeByUserId/${id}`);
      if (req.data.ok === true) {
        setFriendsState((prevState) => {
          return [...prevState, req.data.user];
        });
      } else setMessage(`No user with id: ${id}`);
      setTimeout(() => {
        setMessage("");
      }, 200);
    } catch (error) {
      setMessage("Internal server error");
      console.log(error);
    }
  }

  useEffect(() => {
    friends?.forEach((frd) => {
      decodeByUserId(frd);
    });
  }, []);
  return (
    <div className="page min-h-[100vh] max-h-[100vh] overflow-y-scroll relative bg-gray50">
      <div className="pageTitle sticky top-0 left-0 right-0 bg-preWhite px-4 py-2">
        <p className="text-lg">
          <span className="text-pink5">Friends</span> list
        </p>
      </div>
      <div className="p-4 ">
        <div className="grid grid-cols-3 gap-4">
          {message ? (
            <p>{message}</p>
          ) : (
            friendsState?.map((frd) => {
              return (
                <div key={frd._id}>
                  {
                    <div className="friendProfile flex items-center justify-between border border-textGray p-2 rounded-md">
                      <div className="img&username flex items-center gap-2">
                        <img
                          src={frd.photo}
                          alt="profilePhoto"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-sm">{frd.username}</p>
                      </div>
                      <Link to={`/profile/${frd._id}`} className="bg-pink5 px-2 py-0.5 rounded-md text-xs active:scale-95 duration-75">
                        View profile
                      </Link>
                    </div>
                  }
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
