import React from 'react'
import Avatar from './Avatar'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../redux/UserSlice'
import uploadFile from '../helpers/uploadFile';
import { RiImageAddLine } from "react-icons/ri";
import Divider from "./Divider"



export default function EditUserDetails({onClose,user}) {

     const dispatch=useDispatch()
     

   const validationSchema= Yup.object({
    name: Yup.string()
    .min(5, 'Name must be at least 5 characters')
    .max(15, 'Name must be less than 15 characters'),
    profileImg: Yup.mixed()
      .nullable()
      .test(
        'fileSize',
        'File too large',
        value => !value || (value && value.size <= 3 * 1024 * 1024)    
      )
      .test(
        'fileType',
        'Unsupported file format',
        value => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
      ),
   });

    const formik=useFormik({
        initialValues:{
            name: user?.name,
            profileImg: user?.profileImg,
        },
        validationSchema,
        onSubmit: async(values)=>{

            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/update-user`;

            try { 
                const formData=new FormData()
                formData.append("name", values.name)
                if (values.profileImg) {
                    const uploadedPhoto = await uploadFile(values.profileImg);
                    if (uploadedPhoto) {
                      formData.append('profileImg', uploadedPhoto);
                    } else {
                      throw new Error('Failed to upload image');
                    }
                  }
                
            
                const response=await axios.patch(URL,formData,{
                    headers:{
                        'Content-Type':'application/json'
                    },

                    withCredentials: true
                })
                  if(response.data.success){
                    dispatch(setUser(response.data.data))
                    toast.success("user profile updated!")
                    onClose()
                  }
                   
            } catch (error) {
              toast.error(error?.response?.data?.message || error.message, {
                position: 'top-right',
                style: {
                    background: 'red',
                    color: 'white',
                  },
              });
            }
        }
    })


    const handlePhotoChange = (event) => {
        formik.setFieldValue('profileImg', event.target.files[0]);
      };
    
  return (
    <div className='fixed inset-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
        <div className='bg-white p-4 py-6 m-1 rounded-md w-full max-w-sm'>
            <h2 className='font-semibold'>Profile Details</h2>
            <p className='text-sm'>Edit user details</p>

            <form className='grid gap-3 mt-3' onSubmit={formik.handleSubmit}>
              <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Name:</label>
               <input type='text'
                 name='name'
                 id='name'
                 placeholder='change name'
                 value={formik.values.name}
                 onChange={formik.handleChange}
                 className='w-full py-1 px-2 focus:outline-primary border-spacing-0.5'
                 />
                 {formik.errors.name && formik.touched.name ? (
                  <div className='text-red-500 text-sm'>{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className='flex flex-col gap-1'>
                <div>photo:</div>
                   <div className='my-1 flex items-center gap-4'>
                     <Avatar width={40} height={40} 
                         image={user?.profileImg} 
                         name={user?.name}
                     />
                     <label htmlFor='profileImg'
                       className='font-bold cursor-pointer flex bg-gray-100 px-1 py-2 rounded-lg w-full justify-center items-center'>
                        <RiImageAddLine /><span className='-mt-1 ms-1'>change photo</span>
                     <input type='file'
                     id='profileImg'
                     onChange={handlePhotoChange}
                     className='hidden'
                     
                     />
                     </label>
                   </div>
                </div>

                  <Divider/>
                 <div className='flex gap-2 w-fit ml-auto'>
                    <button className='border-primary border px-4 py-1 text-primary hover:text-white rounded-md hover:scale-105 hover:bg-primary'
                    type='button' onClick={onClose}>Cancel</button>
                    <button type='submit' className='border-primary rounded-md bg-primary text-white border px-4 py-1 
                      hover:scale-105 '>Save</button>
                 </div>
            </form>
        </div>

    </div>
  )
}
