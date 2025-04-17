import {useState,createContext, useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token')||"");
    const [user, setUser]= useState(null);

    useEffect(()=>{
        if(token){
            axios.get("http://localhost:8000/api/user/get-user-details",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                setUser(res?.data?.user)
            }).catch((err)=>{   
                console.log(err)
            })
        }else{
            setUser(null)
            localStorage.removeItem('token')
        }
    },[token])

  return (
    <AuthContext.Provider value={{token, setToken, user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

