import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const PostDetails = () => {

    const [post , setPost] = useState(null);
    const [loading , setLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`https://bloggify-g48x.onrender.com/api/post/getsingle-post/${id}`)
        .then((res)=>{
            if(res.data.success){
                setPost(res.data.post);  
                setLoading(false);
            }
            else{
                toast.error("Error in fetching post details")
            }
  }).catch((err)=>{ 
    setLoading(false);
            toast.error("Error in fetching post details")
            console.log(err);
  })
    },[id])
    

  return (
    <div>
        {
            post && !loading ? (
                <div className='flex justify-center items-center  bg-gradient-to-r from-slate-50 to-blue-100 h-screen  w-full'>
                <div className='w-1/3 text-center shadow-2xl bg-white p-8 rounded-lg'>
                     <img src={`https://bloggify-g48x.onrender.com/uploads/${post.photo}`} alt="" className='w-full h-64 object-fit rounded-lg' />
                  <h1 className='text-4xl font-bold mb-8'>{post.title}</h1>
                 
                  <p className='text-lg mt-4'>{post.description}</p>
                  <p className='text-sm text-gray-500 mt-2'>{post.userId.name}</p>
                  <p className='text-sm text-gray-500'>{new Date(post.createdAt).toLocaleDateString('en-CA')}</p>
                </div>
              </div>
            ):(
                <div className='w-full flex justify-center items-center h-screen'>
                    <h1 className='text-4xl font-bold'>Loading...</h1>
                </div>
            )
        }
    </div>
  )
}

export default PostDetails
