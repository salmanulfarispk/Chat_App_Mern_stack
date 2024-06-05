import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios"
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';


export default function Password() {

      const navigate=useNavigate()
      const location= useLocation()

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
              const formData= new FormData()
               formData.append("password",values.password)

               const res=await axios.post(URL,formData,{
                headers: {
                  'Content-Type':'application/json'
                }
               });

               toast.success(res.data.message)
               formik.setValues({
                password:""
               })

               navigate("/")
              
            } catch (error) {
              toast.error(error?.response?.data?.message || error.message)
            }
        }
      })
      

  return (
    <div className='mt-16 rounded-lg'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <Avatar width={70} name={"Salman Faris"} height={70}/>
        </div>
        <h3 className='flex justify-center items-center'>Melcow Mr User!</h3>

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
