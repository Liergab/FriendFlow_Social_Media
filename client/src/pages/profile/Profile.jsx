import Feed from "../../components/Feed"
import Rightbar from "../../components/Rightbar"
import Sidebar from "../../components/Sidebar"
import Update from "../../components/userUpdate/Update";
import { ApiGetUser } from "../../hooks/useUserApi";
import Topbar from "../topbar/Topbar"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const Profile = () => {
 const {data:reqUser} = ApiGetUser()
  const{username}  = useParams()
  const {data:user} = useQuery(['userById', username], async() => {
    const response  = await axios.get(`http://localhost:8001/v1/api/users?username=${username}`)
           return response.data
    })
   
 
  return (
    <div>
        <Topbar/>
        <div className="flex w-full mt-28 py-4 md:mt-16 md:py-3">
             <Sidebar/>
            <div className="flex flex-col flex-[9]">
              <div>
                <div className="h-80 relative">
                  {user?.coverPicture 
                    ? <img src={`http://localhost:8001/images/${user?.coverPicture}`} alt="" className="w-full h-64 z-0"/> 
                    : null
                  }
                  {user?.profilePicture 
                    ? <img src={`http://localhost:8001/images/${user?.profilePicture} `} alt="" className=" h-40 w-40 rounded-full object-cover absolute  left-0 right-0 top-40 bottom-0 m-auto border-4 border-white" />
                    : null
                  }
                  </div>
                <div className="flex flex-col items-center mt-4">
                  <h1 className="font-bold text-2xl text-gray-800">{user?.username}</h1>
                  <h1 className="text-gray-800">{user?.decs}</h1>
                  {reqUser?.username === user?.username && (
                    <div>
                      <Update/>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
                 <Feed username={username} profile={user} reqUser={reqUser}/>
                 <Rightbar user={user}/>
              </div>
                
            </div>
        </div>
    </div>
  )
}

export default Profile