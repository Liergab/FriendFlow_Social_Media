import {
        Card,
        Input,
        Button,} from '@material-tailwind/react';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { ApiGetUser } from '../../hooks/useUserApi';
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';

const FormUpdate = () => {
    const {data:currentUser} = ApiGetUser()

    const formSchema = yup.object().shape({
        username: yup.string().required('Please put a username!'),
        email:    yup.string().email().required('please put an email!'),
        password: yup.string().required('Please dont leave it blank!').min(6).max(12),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'password does not match').required('Please dont leave it blank!'),
        decs:   yup.string(),
        city:   yup.string(),
        from:   yup.string()

    })

    const {control, handleSubmit, formState:{errors,}} = useForm({
        resolver:yupResolver(formSchema)
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    // useEffect(() => {
    //     if(!formState.isSubmitSuccessful){
    //        toast.error('failed to update')
    //     }
    // },[formState,isSubmitSuccessful])
  return (
    <Card color="transparent" shadow={false}>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1 grid grid-rows-5 grid-flow-col gap-8">
        <Controller 
            name='username'
            control={control}
            defaultValue={currentUser?.username}
            render={({field}) => (
                <Input
                type='text'
                size="lg"
                value={field.value}
                label='username' 
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
        /> 
          {errors.username && <span className="text-sm text-red-600">{errors.username.message}</span>} 
         <Controller
            name='email'
            control={control}
            defaultValue={currentUser?.email}
            render={({field}) => (
                 <Input
                    type='text'
                    label='email'
                    size='lg'
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                 />
            )}
        />
          {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>} 

        <Controller
            name='password'
            control={control}
            defaultValue={currentUser?.password}
            render={({field}) => (
                <Input
                    type="password"
                    size="lg"
                    label='password'
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                />
            )}
        />
          {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>} 

        <Controller 
            name='confirmPassword'
            control={control}
            render={({field}) => (
                <Input
                type="password"
                size="lg"
                label='Confirm Password'
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
        />
          {errors.confirmPassword && <span className="text-sm text-red-600">{errors.confirmPassword.message}</span>} 

        <Controller 
           name='decs'
           control={control}
           defaultValue={currentUser?.decs}
           render={({field}) => (
            <Input
                type="text"
                size="lg"
                label='Description'
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
          />
           )}
        />

        <Controller 
         name='city'
         control={control}
         defaultValue={currentUser?.city}
         render={({field}) => (
            <Input
                type="text"
                size="lg"
                label='City'
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
          />
        )}
        />
        <Controller 
         name='from'
         control={control}
         defaultValue={currentUser?.from}
         render={({field}) => (
            <Input
                type="text"
                size="lg"
                label='From'
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
          />
        )}
        />
      </div>
    
      <Button className="mt-6" fullWidth type='submit'>
        update
      </Button>
      
    </form>
  </Card>
  )
}

export default FormUpdate