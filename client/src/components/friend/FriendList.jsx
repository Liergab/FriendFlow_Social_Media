/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom'
const FriendList = ({frnd}) => {
  
  return (
    <div className="flex flex-col">
             <Link to={`/profile/${frnd.username}`}>
                {frnd?.profilePicture ? 
                <img src={`http://localhost:8001/images/${frnd?.profilePicture}`} alt="" className="w-28 h-28 rounded-md  object-cover" />
                : null }
             </Link>
              <span>{frnd?.username}</span>
            </div>
   
  )
}

export default FriendList
