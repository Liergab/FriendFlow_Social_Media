import {Card, Typography, Input , Button} from '@material-tailwind/react';
import './Shadow.css';
import {Link, useNavigate} from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ApiLogin } from '../../hooks/useApi';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate()
  const loginAccount = useMutation({
    mutationFn: ApiLogin,
    onSuccess: () => {
        toast.success('Succssfully login!')
        navigate('/home')
    }
  })

  const formSchema = yup.object().shape({
      email: yup.string().required('Email is required!'),
      password: yup.string().required('Password id required!').min(8).max(12)
  })

  const {register, handleSubmit,reset, formState, formState:{errors,isSubmitSuccessful}} = useForm({
   
    resolver: yupResolver(formSchema)
    
  })
  const onSubmit = async(data) => {
    try {
      await loginAccount.mutateAsync(data)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if(formState.isSubmitSuccessful){
      reset()
    }
  },[formState,reset,isSubmitSuccessful])

  return (
    <div className='flex'>
        <div className='flex-1 flex flex-col  items-center  place-content-center h-screen space-y-2'>
            <h1 className='text-6xl font-bold text-blue-800 '>FriendFlow</h1>
            <h1 className=' max-w-md text-2xl font-semibold  ml-36'>Connect with Friends and the world around you on Friendflow</h1>
        </div>
        <div className='flex-1 flex items-center place-content-center h-screen'>
            <Card color="white"    className='p-4 shadow-md border-2 border-gray-100' >
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 flex flex-col gap-6">
                    <Input type='text' size="lg" label="Email" {...register('email')} />
                    {errors.email &&  <span className="text-sm text-red-600">{errors.email.message}</span>}
                    <Input type="password" size="lg" label="Password" {...register('password')} />
                    {errors.password &&  <span className="text-sm text-red-600">{errors.password.message}</span>}
                    </div>
                    <Button className="mt-6" color='blue' fullWidth type='submit'>
                    Login
                    </Button>
                    <Typography color="gray" className="mt-4 text-left font-normal hover:cursor-pointer">
                         Forget password?
                    </Typography>
                    <Link to='/register'>
                      <Button className='mt-6' color='green' fullWidth >Create Account</Button>
                    </Link>
                </form>
             </Card>
        </div>
    
    </div>
  )
}

export default Login