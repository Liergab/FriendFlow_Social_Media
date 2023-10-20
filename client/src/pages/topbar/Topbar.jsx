import {Input, Badge, Avatar, Tooltip, IconButton,Menu, MenuList, MenuHandler,MenuItem} from '@material-tailwind/react'
import { MagnifyingGlassIcon, 
        UserIcon, 
        ChatBubbleOvalLeftEllipsisIcon,
        BellIcon,
        HomeIcon,
        QueueListIcon,
        ArrowRightOnRectangleIcon
       } from '@heroicons/react/24/outline';

import {Link} from 'react-router-dom'

// import cvProfile from '../../assets/image/cvprofile.jpg'
import { ApiGetUser } from '../../hooks/useUserApi';

const Topbar = () => {
    const {data:user} = ApiGetUser()
  return (
    <div className=' md:flex justify-between items-center  bg-blue-700 py-4 px-8 fixed w-full space-y-4  md:space-y-0 space-x-4 top-0 z-10' >
        <div className='flex-[1.5] flex items-center justify-between space-x-5'>

            <Link to='/home'>
                 <span className='text-base md:text-2xl font-bold text-white'>FriendFLow</span>
            </Link>

            <div className="flex  items-center space-x-4">

                <MagnifyingGlassIcon className='w-4 md:w-6  text-white'/>

                <div className='w-auto md:w-96 rounded-lg '>
                    <Input name='search' id='search' variant="standard" label='search  friends, post or video' color="white"/>
                </div>

             </div>
        </div>
        <div className='flex-1 flex items-center justify-around place-content-center '>
                <IconButton variant='text'>
                    <Tooltip content='Home page'  className=' bg-blue-600'>
                        <HomeIcon className='w-6 md:w-8 text-white hover:cursor-pointer'/>
                    </Tooltip>
                </IconButton>
               
               <IconButton variant='text'>
                <Tooltip content='Timeline' className='bg-blue-600'>
                        <QueueListIcon className=' w-6 md:w-8 text-white hover:cursor-pointer'/>
                    </Tooltip>
               </IconButton>
                
               <IconButton variant='text'>
                <Tooltip content='User' className=': bg-blue-600'>
                        <div>
                            <Badge withBorder>
                                <UserIcon className='w-6 md:w-8  text-white hover:cursor-pointer'/>
                            </Badge>
                        </div>
                    </Tooltip>
               </IconButton>
                
                <IconButton variant='text'>
                    <Tooltip content='Message' className=' bg-blue-600'>
                        <div>
                            <Badge withBorder>
                                <ChatBubbleOvalLeftEllipsisIcon className='w-6 md:w-8 text-white hover:cursor-pointer'/>
                            </Badge>
                        </div>
                    </Tooltip>
                </IconButton>
                
                <IconButton variant='text'>
                    <Tooltip content='Notification' className=' bg-blue-600' >
                        <div>
                            <Badge withBorder>
                                <BellIcon className='w-6 md:w-8  text-white hover:cursor-pointer'/>
                            </Badge>
                        </div>
                    </Tooltip>   
                </IconButton>
                <Menu>
                    <MenuHandler>
                    <Avatar src={`http://localhost:8001/images/${user?.profilePicture}`}size='sm' withBorder/>
                    </MenuHandler>
                    <MenuList className="max-h-72">
                        <Link to={`/profile/${user?.username}`}>
                            <MenuItem className='flex items-center space-x-2'>
                                <Avatar src={`http://localhost:8001/images/${user?.profilePicture}`}className='w-6 h-6' withBorder/>
                                <h1 className='font-semibold'>{user?.username.toUpperCase()}</h1> 
                            </MenuItem>
                        </Link>
                        <Link to='/logout'>
                            <MenuItem className='flex items-center space-x-2'>
                                <ArrowRightOnRectangleIcon className='w-6'/>
                                <span className='font-semibold'>Logout</span>
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
                     
        </div>
    </div>
  )
}

export default Topbar