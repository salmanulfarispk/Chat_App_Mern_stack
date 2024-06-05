import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function ResetPass() {
  const params = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Include atleast one  (A-Z), (a-z), (0-9), and (!@#$%^&*)'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/reset-password`;
      try {

        const response = await axios.post(URL, { token: params.token, password: values.password }, {
          headers: { 'Content-Type': 'application/json' }
        });

        toast.success(response.data.message);
        navigate('/emailpage');
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  });

  return (
    <div className='mt-16 rounded-lg'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h1 className='w-fit mx-auto text-2xl font-serif font-bold'>Reset Password</h1>
        <form className='grid gap-4 mt-5' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='newpassword'>New Password:</label>
            <input
              type='password'
              id='password' 
              name='password' 
              placeholder='Enter new password'
              className='bg-slate-100 px-2 py-3 focus:outline-primary'
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
            <label htmlFor='confirmPassword'>Confirm Password:</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm new password'
              className='bg-slate-100 px-2 py-3 focus:outline-primary'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className='text-red-600'>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button
            type='submit'
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
