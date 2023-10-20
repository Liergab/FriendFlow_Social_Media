/* eslint-disable react/prop-types */
import { Avatar, Card, Spinner } from "@material-tailwind/react";
import heart from '../../assets/image/heart.png';
import like from '../../assets/image/like.png';
import {EllipsisVerticalIcon} from '@heroicons/react/24/outline';
import { ApiGetUserById } from "../../hooks/useUserApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiLikesPost } from "../../hooks/usePostApi";
import toast from 'react-hot-toast'
import {format} from 'timeago.js'
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Post = ({post}) => {
    
    const queryClient = useQueryClient()
    const{data:user,  isLoading} = ApiGetUserById(post?.userId)
    const likeOrDislike = useMutation({
        mutationFn:ApiLikesPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['Timeline']})
        }
    })
    useEffect(() => {
        post
        user

    },[post,user])

    const handleClick = (id) => {
        try {
           likeOrDislike.mutate(id)
        } catch (error) {
            console.log(error.response.data.message);
          toast.error(error.response.data.message);
        }
    }
  return (
     <div className="flex-1">
        {isLoading && <Spinner size='md'/> }
        <div className="p-4">
            <Card className="w-[22rem] md:w-[38rem]">
                <div className="flex justify-between p-4 ">
                    <div className="flex items-center space-x-3"> 
                        <div className="flex items-center space-x-2">
                            <Link to={`/profile/${user?.username}`}>
                               {user?.profilePicture && (<Avatar src={`http://localhost:8001/images/${user?.profilePicture}`} size="sm"/>)} 
                            </Link>
                            
                             <h1 className="font-semibold hover:cursor-pointer">{user?.username}</h1>
                             
                         </div>
                        <span>{format(post?.createdAt)}</span>
                    </div>
                    <div>
                        <EllipsisVerticalIcon className="w-6 font-bold"/>
                    </div>
                </div>
                <div className="p-2">
                    <div className="p-2">
                        <h1>{ post?.decs}</h1>
                    </div>
                    <div className="p-2">
                       {post?.img &&  <img src={`http://localhost:8001/images/${post?.img}`} alt="" className="max-h-[500px] w-full"/>} 
                    </div>
                </div>
                <div className="p-6 flex justify-between">
                  <div className="flex items-center space-x-2">
                    <div  className='flex items-center space-x-1'>
                        <img src={like} alt=""  className="w-4 hover:cursor-pointer" 
                            onClick={() => handleClick(post?._id)}/> 
                        <img src={heart} alt="" className="w-4 hover:cursor-pointer" 
                        onClick={() => handleClick(post?._id)}/> 
                    </div>
                    <span className="hover:cursor-pointer"> {post?.likes.length} people like it</span>
                  </div>
                  <span className="hover:cursor-pointer">comment</span>
                </div>
            </Card>
        </div>
          
     </div>
  )
}

export default Post
