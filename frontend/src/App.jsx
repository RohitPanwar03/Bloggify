import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Layout from './Components/Layout'
import CreatePost from './Pages/CreatePost'
import MyPosts from './Pages/MyPosts'
import UpdatePost from './Pages/UpdatePost'
import PostDetails from './Pages/PostDetails'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>

      <Route index element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/my-posts' element={<MyPosts/>}/>
      <Route path='/post-details/:id' element={<PostDetails/>}/>
      <Route path='/update-post/:id' element={<UpdatePost/>}/>
      <Route path='*' element={<h1 className='text-3xl text-center'>404 Not Found</h1>}/>
      </Route>
    </Routes>
  )
}
export default App
