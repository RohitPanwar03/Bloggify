import {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';

const Login = () => {

  const [email, setEmail] = useState('')    
  const [password, setPassword] = useState('')
  const {setToken}=useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    const response = await axios.post(`https://bloggify-g48x.onrender.com/api/user/login`, {
        email,
        password
      })
    const data = response.data
    if (data.success) {
      toast.success('User Login successful!');
      setToken(data.token)
      localStorage.setItem('token',data.token);
navigate('/');
    } else {
      toast.error('Login failed!')
    }
  }

  return (
    <div className='flex justify-center items-center  bg-gradient-to-r from-slate-50 to-blue-100 h-screen  w-full'>
      <div className='w-1/3 text-center shadow-2xl bg-white p-8 rounded-lg'>
        <h1 className='text-4xl font-bold mb-8'>Login</h1>
        <form onSubmit={handleLogin} className='flex flex-col items-stretch gap-4'>
         
          <input type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email' 
          className='border border-gray-300 p-2 rounded' />
          <input type="password" 
          value={password}  
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' 
          className='border border-gray-300 p-2 rounded' />
          <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Login</button>
        </form>
        <p className='mt-4'>Don't have an account? <Link href="/register" className='text-blue-500'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login
