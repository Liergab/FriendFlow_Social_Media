import {Card, Typography, Input , Button} from '@material-tailwind/react'
import '../login/Shadow.css'
import {Link, useNavigate} from 'react-router-dom';
import { ApiRegister } from '../../hooks/useApi';
import { useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate()
    const registerAccount = useMutation({
        mutationFn:ApiRegister,
        onSuccess: () => {
            navigate('/')
           toast.success('Succefully Register')
        }
    })

    const formSchema = yup.object().shape({
        username:yup.string().required('Username is required!'),
        email: yup.string().email().required('Email is required!'),
        password: yup.string().required('Password is required!').max(12).min(8),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password does not match').required('Confirming the password is required!')
    })

    const {register, handleSubmit,reset, formState, formState:{errors, isSubmitSuccessful}} = useForm({
        resolver:yupResolver(formSchema)
    })
    const onSubmit = async(data) => {
        try {
            await  registerAccount.mutateAsync(data)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
     
    }

    useEffect(() => {
        if(formState.isSubmitSuccessful){
            reset()
        }
    },[formState,isSubmitSuccessful,reset])
  return (
    <div className='flex'>
        <div className='flex-1 flex flex-col  items-center  place-content-center h-screen space-y-2'>
            <h1 className='text-6xl font-bold text-blue-800 '>FriendFlow</h1>
            <h1 className=' max-w-md text-2xl font-semibold  ml-36'>Connect with Friends and the world around you on Friendflow</h1>
        </div>
        <div className='flex-1 flex items-center place-content-center h-screen'>
            <Card color="white"    className='p-4 shadow-md border-2 border-gray-100'onSubmit={handleSubmit(onSubmit)} >
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">

                    <Input type='text' name='username' size="lg" label="Username" {...register('username')} />
                    {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>}
                    <Input type='text' name='email' size="lg" label="Email" {...register('email')} />
                    {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
                    <Input type="password" name='password' size="lg" label="Password" autoComplete='on' {...register('password')}/>
                    {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
                    <Input type="password" name='confirmPassword' size="lg" label="Confirm Password"  autoComplete='off' {...register('confirmPassword')} />
                    {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>}
                    </div>
                    <Button className="mt-6" color='blue' fullWidth type='submit'>
                    Register
                    </Button>
                    <Typography color="gray" className="mt-4 text-left font-normal hover:cursor-pointer">
                        Already have Account?
                    </Typography>
                    <Link to='/'>
                        <Button className='mt-6' color='green' fullWidth >Sign In</Button>
                    </Link>
                   
                </form>
            </Card>
        </div>
  </div>
  )
}

export default Register