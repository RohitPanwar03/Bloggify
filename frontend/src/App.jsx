import './App.css'
import { lazy} from 'react';
import { Routes, Route } from 'react-router-dom'
const HomePage = lazy(()=>('./Pages/Login'));
const Login = lazy(()=>('./Pages/Register'));
const Register = lazy(()=>('./Components/Layout'));
const CreatePost = lazy(()=>('./Pages/CreatePost'));
const MyPosts = lazy(()=>('./Pages/MyPosts'));
const PostDetails = lazy(()=>('./Pages/UpdatePost'));
const UpdatePost = lazy(()=>('./Pages/PostDetails'));

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
