import React, { useEffect ,useState} from 'react'
import Navbar from './Navbar'
import LeftSide  from './LeftSide'
import axios from 'axios'
import Post from './Post'

const Home = ({user,logged}) => {

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
      <Navbar user={user} logged={logged}/>
      <div className='flex gap-1'>
        <div className='leftSide hidden sm:block min-w-fit h-[calc(100vh-80px)]'>
          <LeftSide />
        </div>
        <div className='overflow-y-scroll max-h-[calc(100vh-80px)] w-[100%] grid grid-cols-1 p-10 gap-10 sm:gap-8 sm:p-8 sm:grid-cols-2 lg:p-10 lg:gap-10 lg:grid-cols-3 xl:gap-14 xl:p-14 h-fit'>
          {
            posts ?
            posts.map(post=>(
              <div key={post._id} className='p-2 bg-white rounded-md h-fit '>
                <Post {...post} user={user}/>
              </div>
            ))
            :
            'loading...'
          }
        </div>
      </div>
    </div>
  )
}

export default Home