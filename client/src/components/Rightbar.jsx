/* eslint-disable react/prop-types */
import OnlineFrnd from "./Online/OnlineFrnd"
import { Users } from "../Dummydata"
import fbgift from '../assets/image/fbgift.png';
import ads from '../assets/image/ads.jpeg';
import {Card,List, ListItem,Button} from '@material-tailwind/react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Link} from 'react-router-dom'
import axios from "axios";
import { ApiFollowed, ApiGetUser, ApiUnFollow } from "../hooks/useUserApi";
import {PlusIcon, MinusIcon} from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";


const Rightbar = ({user}) => {
   
  const {data:alluser,isLoading:userLoading} = useQuery(['allUser'], async() => {
      const response = await axios.get(`http://localhost:8001/v1/api/users/all`)
      return response.data
  })

  const queryClient = useQueryClient()
  const apiFollowed = useMutation({
    mutationFn:ApiFollowed,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['userById']})
    }
  });

  const apiUnFollow = useMutation({
    mutationFn:ApiUnFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['userById']})
    }
  });
  
  const [followed, setFollowed] = useState()

  const {data:currentUser} = ApiGetUser()

  const {data:frnd, isLoading} = useQuery(['userfriend', user?._id], async() => {
    if(user?._id) {
      const response = await axios.get('http://localhost:8001/v1/api/users/following/'+user?._id)
      return response.data
    }
       return{}
    })
    
    
    useEffect(() => {
      if (currentUser && user?._id) {
        setFollowed(currentUser?.followings.includes(user?._id))
        console.log(user?._id)
        console.log(`requser: ${currentUser?._id}`)
        
    }
    },[currentUser,user?._id])

  const handleFollow = () => {
    try {
      if (user?._id && currentUser?._id) {
            apiFollowed.mutate({id:user?._id, userId:currentUser?._id})
    }
       
    } catch (error) {
      console.log(error)
    }
    setFollowed((prevFollowed) => !prevFollowed);
  }

  const handleUnFollow =() => {
    try {
      if (user?._id && currentUser?._id) {
            apiUnFollow.mutate({id:user?._id, userId:currentUser?._id})
    }
    } catch (error) {
      console.log(error)
    }
    setFollowed((prevFollowed) => !prevFollowed);
  }



  const HomeRightbar = () => {
    return (
      <>
       <div className='flex items-center max-w-sm'>
          <img src={fbgift} alt=""  className='w-14'/>
          <span> <b>Christine Evangelist</b> and <b>3 other friends</b> have a birthday today.</span>
        </div>
        <Card className='flex items-center w-[29rem]'>
          <img src={ads} alt="" className='p-1 : rounded-2xl'/>
        </Card>
        <div className='space-y-4'>
          <h1 className='font-bold'>Suggestion Friend</h1>
          {alluser && alluser.map ((s) => (
                <OnlineFrnd key={s?._id} user={s}/>
          ))}
        </div>
      </>
    );
  };
  const ProfileRightbar = () => {
    if(isLoading){
      return <h1>loading..</h1>
    }
    return (
      
      <>
       {user?.username != currentUser?.username && (
        <div className="flex ">
      {followed ? 
          <Button size="sm" color="blue" className="flex items-center space-x-2" onClick={handleUnFollow}>
              <span>unfollow</span> <MinusIcon className="w-4"/> 
            </Button>
          : <Button size="sm" color="blue" className="flex items-center space-x-2" onClick={handleFollow}>
              <span>follow</span> <PlusIcon className="w-4"/>  
            </Button>
      }
        </div>
       )}
       <h1 className="font-bold text-gray-700">User Information</h1>
       <div>
          <Card>
            <List>
              <ListItem className="space-x-1"><span>City:</span> <span>{user?.city}</span></ListItem>
              <ListItem className="space-x-1"><span>From:</span> <span>{user?.from}</span></ListItem>
              <ListItem className="space-x-1"><span>Relationship:</span> <span>{user?.relationship === 1 ? "Single" :
              user?.relationship === 2 ? "Merried" : "No status" }</span></ListItem>
            </List>
          </Card>
       </div>
       <h1>User Friends</h1>
       
         <div className="flex  items-center flex-wrap  gap-4">
          {frnd.map((f) => (
            <div className="flex flex-col" key={f._id}>
            <Link to={`/profile/${f?.username}`}>
            {f?.profilePicture ? 
            <img src={`http://localhost:8001/images/${f?.profilePicture}`} alt="" className="w-28 h-28 rounded-md  object-cover" />
            : null }
            </Link>
            <span>{f?.username}</span>
            </div>
          )
          
          )}
         
           
       </div>
      </>
    );
  };


  return (
    <div className="hidden md:block flex-[4]">
      <div className='flex flex-col p-4 space-y-8 '>
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
