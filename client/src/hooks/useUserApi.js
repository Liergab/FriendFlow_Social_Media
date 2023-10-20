import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

// the user of this system fetching his/her data
export const ApiGetUser = () => {
    const{data, isLoading, isError} = useQuery(['user'], async() => {
            const response = await axios.get('http://localhost:8001/v1/api/getuser')
            return response.data
    })
    return{data, isLoading ,isError}
}

// get individual data to have a individual profile page
export const ApiGetUserById = (userId) => {
 const {data, isLoading, isError} = useQuery(['userById', userId], async() => {
 const response  = await axios.get(`http://localhost:8001/v1/api/users?id=${userId}`)
        return response.data
 })
 return{data, isLoading, isError}
}

// get the follower of this user
export const  ApiGetFollowing = (userId) => {
    const {data, isLoading, isError} = useQuery(['userfriend', userId], async() => {

        const response = await axios.get(`http://localhost:8001/v1/api/users/following/${userId}`)
        return response.data
    })

    return {data, isLoading, isError}
}
// followed
export const ApiFollowed = async(userData) => {
    const response = await axios.put(`http://localhost:8001/v1/api/users/${userData?.id}/follow`,{userId:userData?.userId});
    return response.data
}


// unfollow
export const ApiUnFollow= async(userData) => {
    const response = await axios.put(`http://localhost:8001/v1/api/users/${userData?.id}/unfollow`,{userId:userData?.userId});
    return response.data
}
