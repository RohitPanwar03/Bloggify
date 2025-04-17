import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const handleCreatePost =async(e)=>{
e.preventDefault();

const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo", photo);

const res = await axios.post("http://localhost:8000/api/post/create",formData,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }   
})
if(res.data.success){
    toast.success("Post created successfully")
    navigate('/')
    }else{
        toast.error("Error in creating post")
    }
}

  return (
    <div className='flex justify-center items-center  bg-gradient-to-r from-slate-50 to-blue-100 h-screen  w-full'>
    <div className='w-1/3 text-center shadow-2xl bg-white p-8 rounded-lg'>
      <h1 className='text-4xl font-bold mb-8'>Create New Post</h1>
      <form onSubmit={handleCreatePost} className='flex flex-col items-stretch gap-4'>
       
        <input type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title...' 
        className='border border-gray-300 p-2 rounded' />
        <input type="text" 
        value={description}  
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Descrition...' 
        className='border border-gray-300 p-2 rounded' />
        <input type="file"
        onChange={(e)=>setPhoto(e.target.files[0])}/>
        <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Create Post</button>
      </form>
      
    </div>
  </div>
  )
}

export default CreatePost