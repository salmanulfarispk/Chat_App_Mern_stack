import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/UserSlice';


export default function Password() {

      const navigate=useNavigate()
      const location= useLocation()
      const dispatch=useDispatch()

       useEffect(()=>{
        if(!location?.state?.name){
          navigate("/emailpage")        //even if we dont login and try to naviagte to password page ,it directly goes to email page
        }
       },[])

      const formik=useFormik({
        initialValues:{
          password:""
        },
        validationSchema: Yup.object({
          password: Yup.string()
           .min(5, 'Password must be at least 5 characters')
           .required('Password is required')
           .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Include atleast one  (A-Z), (a-z), (0-9), and (!@#$%^&*)'),
        }),
        onSubmit: async(values)=>{

            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/password`;

            try {

               const res=await axios.post(URL, {
                password: values.password,
                userId: location?.state?._id
            },{
                headers: {
                  'Content-Type':'application/json'
                },

                withCredentials: true
                
               });
                 
               
               if(res.data.success){
               toast.success(res.data.message,{
                position: 'top-right',
                style: {
                    background: '#219C90',
                    color: 'white',
                  },
               })
                dispatch(setToken(res?.data?.token))  //when i pasword succes the token is stored in token in slice means store
                localStorage.setItem("token",res?.data?.token)
                formik.setValues({
                password:""
               });

               navigate("/")
               }
               
              
            } catch (error) {
              toast.error(error?.response?.data?.message || error.message,{
                position: 'top-right',
                style: {
                    background: 'red',
                    color: 'white',
                  },
              })
            }
        }
      })
      

  return (
    <div className='mt-16 rounded-lg'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar width={70} name={location?.state?.name} height={70} image={location?.state?.profileImg}/>
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>

        <form className='grid gap-4 mt-5'onSubmit={formik.handleSubmit} >
        <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter valid password'
              className='bg-slate-100 px-2 py-3 focus:outline-primary'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
               <div className='text-red-600'>{formik.errors.password}</div>
            ): null}
            
          </div>

        <button
            type='submit'
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'//leading and tracking,Controls the line height and Increases the spacing between letters.
          >
            Login
          </button>
          
        </form>

        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
      </div>
    </div>
  )
}
