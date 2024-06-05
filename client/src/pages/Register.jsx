import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from "../helpers/uploadFile";
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, 'Name must be at least 5 characters')
      .max(15, 'Name must be less than 15 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .required('Password is required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Include atleast one  (A-Z), (a-z), (0-9), and (!@#$%^&*)'),
    profileImg: Yup.mixed()
      .nullable()
      .test(
        'fileSize',
        'File too large',
        value => !value || (value && value.size <= 2 * 1024 * 1024)    //value is inputed data in inputfield
      )
      .test(
        'fileType',
        'Unsupported file format',
        value => !value || (value && ['image/jpeg', 'image/png'].includes(value.type))
      ),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      profileImg: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/register`;
      try {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);

        if (values.profileImg) {
          const uploadedPhoto = await uploadFile(values.profileImg);
          if (uploadedPhoto) {
            formData.append('profileImg', uploadedPhoto);
          } else {
            throw new Error('Failed to upload image');
          }
        }

        const response = await axios.post(URL, formData,{
          headers: {
            'Content-Type':'application/json'
          }
        });

        toast.success(response.data.message);
        formik.setValues({           //use resetForm()
          name: '',
          email: '',
          password: '',
          profileImg: '',
        });

          navigate('/emailpage');

      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    },
  });

  const handlePhotoChange = (event) => {
    formik.setFieldValue('profileImg', event.target.files[0]);
  };

  const handleClearPhoto = (e) => {
    e.preventDefault();
    formik.setFieldValue('profileImg', '');
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>Welcome to Chat app!</h3>

        <form className='grid gap-4 mt-5' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className='text-red-600'>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-red-600'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-red-600'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profileImg'>Photo :</label>
            <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
              <label htmlFor='profileImg' className='cursor-pointer flex-1 flex justify-center items-center'>
                <p className='text-sm max-w-[300px] text-ellipsis overflow-hidden'>
                  {formik.values.profileImg?.name
                    ? formik.values.profileImg.name
                    : 'Upload profile photo'}
                </p>
              {formik.values.profileImg && (
                <button
                  type='button'
                  className='text-lg ml-3 hover:text-red-600'
                  onClick={handleClearPhoto}
                >
                  <IoClose />
                </button>
              )}

              </label>
            </div>
            <input
              type='file'
              id='profileImg'
              name='profileImg'
              className='hidden'
              onChange={handlePhotoChange}
            />
            {formik.touched.profileImg && formik.errors.profileImg ? (
              <div className='text-red-600'>{formik.errors.profileImg}</div>
            ) : null}
          </div>

          <button
            type='submit'
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </button>
        </form>

        <p className='my-3 text-center'>Already have an account? <Link to={"/emailpage"} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
