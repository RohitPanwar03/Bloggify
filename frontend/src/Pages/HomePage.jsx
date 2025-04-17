import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const HomePage = () => {

  const [posts, setPosts]=useState([]);

  useEffect(()=>{
    axios.get("https://bloggify-g48x.onrender.com/api/post/get-post")
    .then((res)=>{
      setPosts(res.data.posts);
    })
  },[])

  return (
    <div className='flex justify-evenly flex-wrap'>
{
  posts && posts.length>0 ?(
     posts.map((post)=>{
      return(
        <div key={post._id} className='w-80 shadow-xl rounded-lg border-2 p-4 m-4'>
         
          <img src={`https://bloggify-g48x.onrender.com/uploads/${post.photo}`} alt="" className='w-full h-64 object-fit rounded-lg' />
          
          <h1 className='text-3xl font-bold mt-4'>{post.title}</h1>
          <p className='text-lg'>{post.description.slice(0,20)}</p>
          <div className='flex justify-between mt-2'>
          <p className='text-sm text-gray-500'>{post.userId.name}</p>
          <p className='text-sm text-gray-500'>{new Date(post.createdAt).toLocaleDateString('en-CA')}</p>
          </div>
          <div className='text-blue-500 text-center mt-2'>
          <Link to={`/post-details/${post._id}`} >view</Link>
          </div>
         
        </div>
      )
    })
  ):(
    <div className='w-full flex justify-center items-center h-screen'>
      <h1 className='text-4xl font-bold'>No Posts Available....</h1>
    </div>
  )
}

    </div>
  )
}

export default HomePage
