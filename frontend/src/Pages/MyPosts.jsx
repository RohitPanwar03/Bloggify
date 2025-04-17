import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MdModeEdit,MdDelete  } from "react-icons/md";
import { AuthContext } from '../Context/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const MyPosts = () => {

    const {token }=useContext(AuthContext)
    const [posts, setPosts]=useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
      axios.get(`https://bloggify-g48x.onrender.com/api/post/get-user-post`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((res)=>{
        setPosts(res.data.posts);
      }).catch((err)=>{
        toast.error("Error in fetching posts")
        console.log(err);
      })
    },[token])

    const handleDeletePost = (id)=>{
        try {
            const res= axios.delete(`https://bloggify-g48x.onrender.com/api/post/delete-post/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data.success){
                setPosts(posts.filter((post)=>post._id!==id))
                toast.success("Post deleted successfully")
        }}
         catch (error) {
            toast.error("Error deleting post");
            console.log(error);
        }
    }

  return (
    <div className='flex justify-evenly flex-wrap'>
    {
      posts && posts.length>0 ?(
        posts.map((post)=>{
            return(
              <div key={post._id} className='shadow-xl rounded-lg border-2 p-4 m-4'>
               
                <img src={`https://bloggify-g48x.onrender.com/uploads/${post.photo}`} alt="" className='w-full h-64 object-fit' />
                
                <h1 className='text-3xl font-bold mt-4'>{post.title}</h1>
                <div className='flex justify-between mt-2'>
            <p className='text-sm text-gray-500'>{post.userId.name}</p>
            <p className='text-sm text-gray-500'>{new Date(post.createdAt).toLocaleDateString('en-CA')}</p>
            </div>
            <div className='flex justify-between gap-4 mt-4'>
            <Link to={`/post-details/${post._id}`} className='text-blue-500'>View</Link>
           <div className='flex gap-4'>
           <MdModeEdit onClick={()=>{navigate(`/update-post/${post._id}`)}} className='text-blue-600 cursor-pointer'/>
           <MdDelete onClick={()=>{handleDeletePost(post._id)}} className='text-red-500 cursor-pointer'/>
           </div>
            </div>
               
              </div>
            )
          })
      ):(
        <div className='w-full flex = justify-center items-center h-screen'>
              <h1 className='text-4xl font-bold'>No Posts Available....</h1>
            
        </div>
      )
    }
    
        </div>
  )
}

export default MyPosts
