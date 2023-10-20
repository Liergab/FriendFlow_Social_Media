/* eslint-disable react/prop-types */
import Share from "./shared/Share"
import Post from "./post/Post"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const Feed = ({user, username,profile}) => {
  // const{data:posts} = ApiTimeline(user?._id)
  const {data:posts,} = useQuery(['Timeline', user?._id, username], async() => {
    const response =  username 
    ? await axios.get(`http://localhost:8001/v1/api/post/profile/${username}`) 
    : await axios.get(`http://localhost:8001/v1/api/timeline/${user?._id}`)
    return response.data
});

 

  return (
    <div className="flex-[6]">
        <div className=" flex flex-col items-center place-content-center md:ml-96 ">
            <Share user={user} profile={profile}/>
            {posts ? posts.map((p) => (<Post key={p._id} post={p} user={user}/>) ) : null}
        </div>
      
    </div>
  )
}

export default Feed