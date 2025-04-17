import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')    
  const [password, setPassword] = useState('')

  const handleRegister = async(e) => {
    e.preventDefault()
    const response = await axios.post(`http://localhost:8000/api/user/register`, {
      name,
        email,
        password
      })
    const data = response.data
    if (data.success) {
      toast.success('User Registered successful!')
    } else {
      toast.error('Registration failed!')
    }
  }

  return (
    <div className='flex justify-center items-center  bg-gradient-to-r from-slate-50 to-blue-100 h-screen  w-full'>
      <div className='w-1/3 text-center shadow-2xl bg-white p-8 rounded-lg'>
        <h1 className='text-4xl font-bold mb-8'>Register</h1>
        <form onSubmit={handleRegister} className='flex flex-col items-stretch gap-4'>
          <input type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Username' 
          className='border border-gray-300 p-2 rounded' />
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
          <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Register</button>
        </form>
        <p className='mt-4'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register