import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBulider from './pages/ResumeBulider'
import Login from './pages/Login'
import Preview from './pages/Preview'
import Feature from './components/home/feature'
import { useDispatch } from 'react-redux'
import api from './config/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const dispatch = useDispatch()

  const getUserData = async() => {
    const token = localStorage.getItem('token');
    try {
      if(token){
        const { data } = await api.get('/api/auth/data' , {headers:{
          Authorization:token
        }})
        if(data.user){
          dispatch(login({token, user:data.user}))
        }
        dispatch(setLoading(false))
      }
      else{
         dispatch(setLoading(false))
      }
    } catch (err) {
       dispatch(setLoading(false))
       console.log(err.message);
       
    }
  }

useEffect(()=>{
getUserData()
},[])

  return (
    <>
     <Toaster />

      <Routes >
        
        <Route path='/' element={<Home />} />
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path='builder/:resumeId' element={< ResumeBulider />} />
        </Route>
        <Route path='view/:resumeId' element={< Preview   /> } />
      </Routes>
    </>
  )
}

export default App
