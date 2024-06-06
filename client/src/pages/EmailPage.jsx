import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircle } from "react-icons/pi";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import toast from 'react-hot-toast';


export default function EmailPage() {

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
        const URL=`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/email`
        try {
          const formdata= new FormData();

          formdata.append("email",values.email)

          const response=await axios.post(URL,formdata,{
            headers: {
              'Content-Type':'application/json'
            }
          });
          
          toast.success(response.data.message);
           
          if(response.data.success){
            formik.setValues({
              email:""
            });
  
            navigate("/passwordpage",{
              state: response?.data?.data
            })
          }
         
        } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
        }
      }
     })

  return (
    <div className='mt-16 rounded-lg'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <PiUserCircle size={80}/>
        </div>
        <h3 className='flex justify-center items-center'>Melcow Mr User!</h3>

        <form className='grid gap-4 mt-5' onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-3 focus:outline-primary'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            {formik.touched.email && formik.errors.email  ? (
               <div className='text-red-600'>{formik.errors.email}</div>
            ): null }
            
          </div>

        <button
            type='submit'
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Let's Go
          </button>
          
        </form>

        <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
      </div>
    </div>
  )
}
