import React, { useEffect ,useState} from 'react'
import Navbar from './Navbar'
import LeftSide  from './LeftSide'
import axios from 'axios'
import Post from './Post'
import CreatePost from './CreatePost'

const Home = ({user,logged,token}) => {

  const [CreatePostWindow,setCreatePostWindow] = useState(false)

  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    try {
      const req = await axios.get('/posts');
      if(req.data.post){
       setPosts(req.data.post);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className='font-Karla bg-gray50 min-h-[100vh] flex flex-col'>
      <Navbar user={user} logged={logged} token={token}/>
      <div className='flex'>
        <div className='leftSide hidden sm:block min-w-fit h-[calc(100vh-80px)]'>
          <LeftSide setCreatePostWindow={setCreatePostWindow} logged={logged}/>
        </div>
          <div className='overflow-y-scroll max-h-[calc(100vh-80px)] w-[100%] grid grid-cols-1 p-10 gap-10 sm:gap-8 sm:p-8 md:grid-cols-2 lg:p-10 lg:grid-cols-3 xl:p-14 h-fit'>
            {
              posts ?
              posts.map(post=>(
                <div key={post._id} className='p-2 bg-white rounded-md h-fit '>
                  <Post {...post} user={user} token={token} logged={logged}/>
                </div>
              ))
              :
              'loading...'
            }
          </div>
      </div>
      {CreatePostWindow && 
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-[rgba(30,30,30,0.3)] z-20 flex items-center justify-center'>
          <CreatePost setCreatePostWindow={setCreatePostWindow} token={token}/>
        </div>
      }
      
    </div>
  )
}

export default Home