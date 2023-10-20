import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

export const ApiGetUser = () => {
    const {data, isLoading, isError} = useQuery(['register'], async() => {

        const response = await axios.get(' http://localhost:8001/v1/api/user');
        return response.data
    });

    return {data, isLoading, isError}
}

export const ApiRegister = async(userData) => {
    const response = await axios.post('http://localhost:8001/v1/api/register',userData,{
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userData)
    })
    return response.data
}

export const ApiLogin = async(userData) => {
    const response = await axios.post('http://localhost:8001/v1/api/login',userData)
    const token = response.data.generateToken
    localStorage.setItem('token',token)
    return response.data
}

