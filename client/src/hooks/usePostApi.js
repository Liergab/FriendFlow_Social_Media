import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

export const ApiTimeline = (userId) => {
    const {data, isLoading, isError} = useQuery(['Timeline', userId], async() => {
        const response =  await axios.get(`http://localhost:8001/v1/api/timeline/${userId}`)
        return response.data
    });

    return {data, isLoading, isError}
} 

export const ApiLikesPost = async(postId) => {
    const response = await axios.put(`http://localhost:8001/v1/api/post/${postId}/like`)
    return response.data
}

export const ApiCreatePost = async(formdata) => {
    const response = await axios.post('http://localhost:8001/v1/api/posts', formdata, {
        headers:{
            'Content-Type':'multipart/form-data'
        },
        body: JSON.stringify(formdata)
    })

    return response.data
}



 