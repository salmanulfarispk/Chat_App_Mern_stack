import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup";
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function ForgotPass() {
   
  const navigate=useNavigate()

  const formik=useFormik({
    initialValues:{
      email:""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async(values)=>{
        const URL=`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/forgot-pass`
      try {
         const formData= new FormData();
         formData.append("email",values.email)
         
         const response=await axios.post(URL,formData,{
          headers:{
            'Content-Type':'application/json'
          }
         });

            toast.success(response.data.message)
            formik.setValues({
              email:""
            });
              navigate('/emailpage')
            

      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  })



  return (
    <div className='mt-16 rounded-lg'>
    <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
         <h1 className='w-fit mx-auto text-2xl font-serif font-bold'>Forgot Password!</h1>
         <p className='overflow-hidden text-cyan-700 my-2 '>Enter your email address to receive a reset link and follow the instructions to set a new password.</p>
       
      <form className='grid gap-4 mt-5' onSubmit={formik.handleSubmit} >
      <div className='flex flex-col gap-1'>
          <label htmlFor='email'>Email :</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter valid registered  email!'
            className='bg-slate-100 px-2 py-3 focus:outline-primary'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>

      <button
          type='submit'
          className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
        >
          send
        </button>
        
      </form>

      <div className='text-sm my-3 text-red-500 p-2 overflow-hidden tracking-tighter'>
      <h1 className='text-lg font-semibold'>instructions :-</h1>
        <ul className='hover:text-red-600'>
        <li>* Enter your email address in the provided field.</li>
        <li>* Click the "Send" button.</li>
        <li>* Check your email for a message from us with a password reset link.</li>
        <li>* Click on the link in the email and create a new password.</li>
         
        </ul>
      </div>

    </div>
  </div>
  )
}
