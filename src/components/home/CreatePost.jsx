import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const CreatePost = ({setCreatePostWindow,token}) => {

  const [ok,setOk] = useState() 
  const [controller,setController] = useState({
    description:'',
    imageUrl:''
  })
  const [message,setMessage] = useState('')
  async function createPost(){
    try{
      const req = await axios.post('/posts',{description:controller.description,imageUrl:controller.imageUrl},{
        headers:{
          authorization:`Bearer ${token}`
        }
        }
      )
      setMessage(req.data.msg)
      if(req.data.ok===true)
        setOk(true)
      else
        setOk(false)
      
      setTimeout(() => {
        setMessage('')
        setController({
          description:'',
          imageUrl:''
        })
        setOk()
        window.location.reload()
      }, 1500);

    }
    catch(error){
      console.log(error)
      setMessage('An error occurred during the process...')
    }
  }

  return (
    <div className='bg-white px-5 py-3 rounded-md flex flex-col gap-5'>
      <div className='header flex items-center justify-between'>
        <p className='text-lg font bold'>Create your new Post</p>
        <i className="bi bi-x text-lg text-red-700 cursor-pointer" onClick={()=>setCreatePostWindow(false)}></i>
      </div>

      <div className='adds flex flex-col gap-2'>
        <div className='description'>
          <p className='text-sm'>Add a description:</p>
          <textarea cols="30" rows="5" className='bg-gray50 resize-none' onChange={(e)=>setController(prevState=>{
            return{
              ...prevState,
              description:e.target.value
            }
          })}
          value={controller.description}
          ></textarea>
        </div>
        <div className='image'>
          <div className="alert flex items-center gap-1 text-sm">
                    <span className="text-red-700">*</span>
                    <p>Username Add an image</p>
          </div>
          <input type='text' placeholder='image URL' className='ml-1 px-2 py-1 outline-none border-b-2 border-gray50 text-sm text-textGray' onChange={(e)=>setController(prevState=>{
            return{
              ...prevState,
              imageUrl:e.target.value
            }
          })}
          value={controller.imageUrl}
          />
        </div>
      </div>

      <button type='submit' className='bg-pink5 text-white text-sm self-center px-3 py-1 rounded-md' onClick={createPost}>Create post</button>
      <p className={`${ok===true ? 'text-green-700' : 'text-red-700'} text-sm text-center`}>{message}</p>
    </div>
  )
}

export default CreatePost