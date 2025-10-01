import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Auth/Signup';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/nav/Navbar';
import Profile from './components/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 const {check , loading , user} = useAuthStore()
  useEffect(() => {
    check(); 
  }, []);
 if (loading) return <div>Loading...</div>;

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}     
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <Navbar/>
    <div className='bg-gray-900 min-h-screen min-w-full '>

     <Routes>
        <Route path='/' element={user ? <Home/> : <Signup/> } />
        <Route path='/auth' element={ user ? <Signup /> : <Home/> } />
        <Route path='/Profile' element={user ? <Profile/> : <Signup/> } />
      </Routes>
    </div>

    </>
  )
}

export default App
