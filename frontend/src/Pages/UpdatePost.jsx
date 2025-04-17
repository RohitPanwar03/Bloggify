import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const UpdatePost = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const {token}=useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    useEffect(()=>{
        axios.get(`https://bloggify-g48x.onrender.com/api/post/getsingle-post/${id}`)
        .then((res)=>{
            if(res.data.success){
                setTitle(res.data.post.title);  
                setDescription(res.data.post.description);
                setPhoto(res.data.post.photo);
            }
            else{
                toast.error("Error in fetching post details")
            }
  }).catch((err)=>{ 
            toast.error("Error in fetching post details")
            console.log(err);
  })
    },[id])
    

    const handleUpdatePost =async(e)=>{
e.preventDefault();

const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo", photo);

const res = await axios.put(`https://bloggify-g48x.onrender.com/api/post/update-post/${id}`,formData,{
    headers:{
        Authorization: `Bearer ${token}`
    }   
})
if(res.data.success){
    toast.success("Post Updated successfully")
    navigate('/my-posts')
    }else{
        toast.error("Error in creating post")
    }
}

  return (
    <div className='flex justify-center items-center  bg-gradient-to-r from-slate-50 to-blue-100 h-screen  w-full'>
    <div className='w-1/3 text-center shadow-2xl bg-white p-8 rounded-lg'>
      <h1 className='text-4xl font-bold mb-8'>Create New Post</h1>
      <form onSubmit={handleUpdatePost} className='flex flex-col items-stretch gap-4'>
       
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

export default UpdatePost
