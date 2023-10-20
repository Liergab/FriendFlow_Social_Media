/* eslint-disable react/prop-types */

import frpic from '../../assets/image/frpic.jpeg';
import { Avatar,Badge} from '@material-tailwind/react';
const OnlineFrnd = ({user}) => {
  return (
    <div className='space-x-2'>
    <Badge color='green'>
      <Avatar src={frpic} size='sm' />
    </Badge>
    <span>{user?.username}</span>
  </div>
  )
}

export default OnlineFrnd