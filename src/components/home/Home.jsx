import React, { useEffect ,useState} from 'react'
import Navbar from './Navbar'
import LeftSide  from './LeftSide'
import axios from 'axios'
import Post from './Post'

const Home = () => {


  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getAllPosts() {
      try {
        const req = await axios.get('/posts');
        setPosts(req.data.post);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPosts();
  }, []);

  return (
    <div className='font-Karla bg-gray50 min-h-[100vh] flex flex-col'>
      <Navbar/>
      <div className='flex gap-1'>
        <div className='leftSide hidden sm:block min-w-fit h-[calc(100vh-80px)]'>
          <LeftSide />
        </div>
        <div className='overflow-y-scroll max-h-[100vh] w-[100%] grid grid-cols-3 gap-14 p-14'>
          {
            posts.map(post=>(
              <div className='p-2 bg-white rounded-md'>
                <Post key={post._id} {...post} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home