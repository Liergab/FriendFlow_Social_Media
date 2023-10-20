/* eslint-disable react/prop-types */
import {Card, List, ListItem,Button, Avatar} from '@material-tailwind/react'
import './Styles/Sidebar.css'
import {NewspaperIcon ,
     ChatBubbleOvalLeftEllipsisIcon, 
     VideoCameraSlashIcon,
     UserGroupIcon,
     BookmarkIcon,
     QuestionMarkCircleIcon,
     BriefcaseIcon,
     CalendarDaysIcon,
     AcademicCapIcon
    } from '@heroicons/react/24/outline';
    import cvProfile from '../assets/image/cvprofile.jpg'
const Sidebar = ({user}) => {
  return (
   
    <div className="hidden md:block  flex-[3] h-screen overflow-y-scroll hide-scrollbar fixed z-10 bg-white" >
     <div className="p-4 flex flex-col items-center space-y-4">
     <Card className="w-80">
      <List>
        <ListItem>USER :{user?.username.toUpperCase()}</ListItem>
        <ListItem className='space-x-4'> <NewspaperIcon className='w-4'/><span>Feed </span></ListItem>
        <ListItem className='space-x-4'> <ChatBubbleOvalLeftEllipsisIcon className='w-4'/><span>Chat</span></ListItem>
        <ListItem className='space-x-4'> <VideoCameraSlashIcon className='w-4'/><span>Video</span></ListItem>
        <ListItem className='space-x-4'> <UserGroupIcon className='w-4'/><span>Group</span> </ListItem>
        <ListItem className='space-x-4'> <BookmarkIcon className='w-4'/><span>Bookmarks</span></ListItem>
        <ListItem className='space-x-4'> <QuestionMarkCircleIcon className='w-4'/><span>Question</span></ListItem>
        <ListItem className='space-x-4'> <BriefcaseIcon className='w-4'/><span>Job</span></ListItem>
        <ListItem className='space-x-4'> <CalendarDaysIcon className='w-4'/><span>Event</span></ListItem>
        <ListItem className='space-x-4'> <AcademicCapIcon className='w-4'/><span>Course</span></ListItem>
        <ListItem><Button color='blue-gray'>See more</Button></ListItem>
      </List>
    </Card>

    <Card className='w-80'>
         <ListItem className='space-x-4'><Avatar src={cvProfile} size='sm'/><span> Bryan Gabriel Rubio</span></ListItem>
         <ListItem className='space-x-4'><Avatar src={cvProfile} size='sm'/><span> Bryan Gabriel Rubio</span></ListItem>
         <ListItem className='space-x-4'><Avatar src={cvProfile} size='sm'/><span> Bryan Gabriel Rubio</span></ListItem>
         <ListItem className='space-x-4'><Avatar src={cvProfile} size='sm'/><span> Bryan Gabriel Rubio</span></ListItem>
         <ListItem className='space-x-4'><Avatar src={cvProfile} size='sm'/><span> Bryan Gabriel Rubio</span></ListItem> 
    </Card>

     </div>
    </div>
   
  )
}

export default Sidebar