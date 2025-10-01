import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Auth/Signup';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/nav/Navbar';
import Profile from './Profile';

function App() {
 const {check , loading , user} = useAuthStore()
  useEffect(() => {
    check(); 
  }, []);
 if (loading) return <div>Loading...</div>;

  return (
    <>
    <Navbar/>
     <Routes>
        <Route path='/' element={user ? <Home/> : <Signup/> } />
        <Route path='/auth' element={ user ? <Signup /> : <Home/> } />
        <Route path='/Profile' element={user ? <Profile/> : <Signup/> } />
      </Routes>

    </>
  )
}

export default App
