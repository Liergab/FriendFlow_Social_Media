/* eslint-disable react/prop-types */
import {Avatar, Button, Card, Input, Tooltip} from '@material-tailwind/react'
import {PhotoIcon, TagIcon, MapPinIcon, FaceSmileIcon} from '@heroicons/react/24/solid';
import {useForm} from 'react-hook-form';
import { useEffect } from 'react';
import { ApiCreatePost } from '../../hooks/usePostApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
const Share = ({user,profile}) => {
  const queryClient = useQueryClient()
  const createPost = useMutation({
    mutationFn: ApiCreatePost,
    onSuccess: () => {
      toast.success("Successfully posted!")
      queryClient.invalidateQueries({queryKey:['Timeline']})
    }
  })
  const {register, handleSubmit, formState,reset, formState:{ isSubmitSuccessful}} = useForm()

  const onSubmit = async(data) => {
    const formData = new FormData();
   
      formData.append('image', data.image[0]);
      formData.append('decs', data.decs);
   
    console.log(formData)
      try {
        const user = await createPost.mutateAsync(formData);
        console.log(user);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }

    
  
  }


  useEffect(() => {
    if(formState.isSubmitSuccessful){
      reset()
    }
  },[reset, formState, isSubmitSuccessful])
  
  return (
    <div className='mt-8'>
        
            <Card className='w-[22rem] md:w-[38rem] flex p-4 space-y-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex  items-center justify-around flex-1 space-x-4 p-1'>

                    {user ? <Avatar  src={`http://localhost:8001/images/${user?.profilePicture}`}  />
                     : <Avatar  src={`http://localhost:8001/images/${profile?.profilePicture}`}  />}
                    
                    <Input name='post' type='text' variant='standard' label="What's on you mind! " {...register('decs')}/>
                   
                </div>
                <div className='flex justify-around items-center p-1'>
                  <Tooltip  content='upload Image' className=' bg-blue-600'>
                      <label htmlFor="fileInput" className="flex items-start">
                        <h1 className='text-sm flex items-center space-x-2'><PhotoIcon className='w-4 md:w-6  text-red-500'/> <span className='hidden md:block'>Photo or Video</span></h1>
                    </label>
                   </Tooltip>
                   
                     <input name='file' type='file' id='fileInput' {...register('image')} className='hidden' />
                   
                   
                   <h1 className='text-sm flex items-center space-x-2'><TagIcon  className='w-4 md:w-6 text-blue-900 '/> <span className='hidden md:block'>Tag</span></h1> 
                   <h1 className='text-sm flex items-center space-x-2'><MapPinIcon  className='w-4 md:w-6 text-green-800'/> <span className='hidden md:block'>Location</span></h1>
                   <h1 className='text-sm flex items-center space-x-2'><FaceSmileIcon className='w-4 md:w-6 text-yellow-900'/> <span className='hidden md:block'>Feelings</span></h1>
                   <Button size='sm' color='green' type='submit'>Share</Button>
                </div>
                </form>
            </Card> 
          
    </div>
  )
}

export default Share