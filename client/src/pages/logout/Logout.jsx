import {Navigate} from 'react-router-dom'
const Logout = () => {
    localStorage.removeItem('token');
  return (
    <Navigate to='/'/>
  )
}

export default Logout