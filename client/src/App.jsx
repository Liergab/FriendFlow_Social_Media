import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import {Toaster} from 'react-hot-toast'
import PrivateLayout from './layout/PrivateLayout'
import Logout from './pages/logout/Logout'
const App = () => {
  return (
    <div className="">
      <Toaster position='top-right'  toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route element={<PrivateLayout/>}>
          <Route path='/home' element={<Home/>} />
          <Route path='/profile/:username' element={<Profile/>} />
          <Route path='logout' element={<Logout/>}/>
        </Route>
        <Route path='*' element='not found'/>
      </Routes>
    </div>
  )
}

export default App
