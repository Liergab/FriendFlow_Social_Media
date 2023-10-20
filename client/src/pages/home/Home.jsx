import Feed from "../../components/Feed"
import Rightbar from "../../components/Rightbar"
import Sidebar from "../../components/Sidebar"
import Topbar from "../topbar/Topbar"
import '../../components/Styles/Sidebar.css'
import { ApiGetUser } from "../../hooks/useUserApi"

const Home = () => {
  const{data:user} = ApiGetUser();
  return (
    <div className="">
        <Topbar/>
        {/* <div className='mt-28 py-4 md:mt-16 md:py-3'> */}
            <div className="md:flex w-full mt-28 py-4 md:mt-16 md:py-3 overflow-y-scroll hide-scrollbar ">
                <Sidebar user={user}/>
                <Feed user={user}/>
               <Rightbar/>
             
            </div>
        </div>
    //  </div>
  )
}

export default Home
