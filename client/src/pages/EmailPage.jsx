import React from 'react'
import { Link } from 'react-router-dom';

export default function EmailPage() {
  return (
    <div className='mt-16 rounded-lg'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>Welcome to Chat app!</h3>

        <form className='grid gap-4 mt-5'>
        <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-3 focus:outline-primary'
              required
            />
            
          </div>

        <button
            type='submit'
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            submit
          </button>
        </form>

        <p className='my-3 text-center'>Go to password page? <Link to={"/passwordPage"} className='hover:text-primary font-semibold'>password</Link></p>
      </div>
    </div>
  )
}
