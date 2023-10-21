/* eslint-disable react/prop-types */
import { Avatar,Badge} from '@material-tailwind/react';
import {Link} from 'react-router-dom'
const OnlineFrnd = ({user}) => {
  return (
    <div className='space-x-2'>
    <Badge color='green'>
      <Link to={`/profile/${user?.username}`}>
      {user?.profilePicture
        ? <Avatar src={`http://localhost:8001/images/${user?.profilePicture}`} size='sm' /> 
        : null
      }
      </Link>
    </Badge>
    <span>{user?.username}</span>
  </div>
  )
}

export default OnlineFrnd