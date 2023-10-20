import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from 'jwt-decode';
const PrivateLayout = () => {
    const token = localStorage.getItem('token')
    if(token){
        try {
            // Decode the token to check its validity and expiration
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp > currentTime) {
              // Token is valid and not expired
              return <Outlet />;
            }
          } catch (error) {
            // Token is invalid or expired
            console.error('Invalid token:', error);
          }
    }
  return <Navigate to='/' />
}

export default PrivateLayout