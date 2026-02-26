import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../../hooks/user/useLogin'

type LoginFormData = {
  email: string
  password: string
}

export default function Login() {
  const { login, userInfo, error } = useLogin()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = useCallback((event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // Replace this with your API/login action.
    login(formData)
    console.log('Login form submitted:', formData)
  }, [formData, login])

  if (userInfo) {
    navigate("/dashboard")
  }
  if (error) {
    alert(error)
  }
  return (
    <div className='min-h-screen w-full bg-slate-100 px-4 py-10 flex items-center justify-center'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-slate-200'>
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-slate-900'>Welcome back</h1>
          <p className='text-sm text-slate-500 mt-1'>Sign in to continue to your notes.</p>
        </div>

        <form className='space-y-4'>
          <div className='space-y-1'>
            <label htmlFor='login-email' className='text-sm font-medium text-slate-700'>Email</label>
            <input
              id='login-email'
              name='email'
              type='email'
              placeholder='name@example.com'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            />
          </div>

          <div className='space-y-1'>
            <label htmlFor='login-password' className='text-sm font-medium text-slate-700'>Password</label>
            <input
              id='login-password'
              name='password'
              type='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            />
          </div>

          <button
            onClick={handleLoginSubmit}
            type='submit'
            className='w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors'
          >
            Sign In
          </button>
        </form>

        <p className='mt-5 text-center text-sm text-slate-600'>
          Don&apos;t have an account?{' '}
          <Link to='/auth/register' className='font-medium text-blue-600 hover:text-blue-700'>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
