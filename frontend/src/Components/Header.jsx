import React, { useContext } from 'react'
import { FaBlogger,FaHome  } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut} from "react-icons/io";
import { MdPostAdd } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Header = () => {

  const {user,setUser}=useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <nav className='w-full h-20 bg-slate-600 text-white'>
      <div className='flex justify-evenly items-center h-full px-4'>
        <div className='flex items-center gap-2'>
        <FaBlogger className='h-8 w-full'/> 
          <h1 className='text-3xl font-bold'>Bloggify</h1>
        </div>
        <div className='flex items-center gap-20 font-medium text-xl'> 
          <Link to="/" className='hover:text-blue-300 '><FaHome/></Link>
          {
            user && user!=null ? 
                (
                  <>
                 
                  <Link to="/create-post" className='hover:text-blue-300 flex items-center gap-1 hover:border-b-2 border-blue-300'>
              <MdPostAdd/> Create Post
              </Link>
                  <Link to="/my-posts" className='hover:text-blue-300 hover:border-b-2 border-blue-300'>
              My Posts  
              </Link>
                  <button onClick={handleLogout} className='flex items-center gap-2' >
              <IoIosLogOut /> Logout
              </button>
                  </>
                )
             : 
             (
              <div className='flex items-center gap-2'>
                <IoIosLogIn/>
                <Link to="/login" className='text-lg'>Login</Link>
              </div>
        )
          }
        </div>
      
      </div>
    </nav>
  )
}

export default Header