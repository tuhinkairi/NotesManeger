import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useRegister from '../../hooks/user/useRegister'

type RegisterFormData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default function Register() {
    const {register, userInfo}=useRegister()
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value.trim() }))
    }

    const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Replace this with your API/register action.
        register(formData)
        console.log('Register form submitted:', formData)
    }

    if (userInfo) {
        console.log(userInfo)
    }
    return (
        <div className='min-h-screen w-full bg-slate-100 px-4 py-10 flex items-center justify-center'>
            <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-slate-200'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold text-slate-900'>Create account</h1>
                    <p className='text-sm text-slate-500 mt-1'>Start managing your notes in one place.</p>
                </div>

                <form className='space-y-4' onSubmit={handleRegisterSubmit}>
                    <div className='space-y-1'>
                        <label htmlFor='register-name' className='text-sm font-medium text-slate-700'>Full Name</label>
                        <input
                            id='register-name'
                            name='name'
                            type='text'
                            placeholder='Enter your name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        />
                    </div>

                    <div className='space-y-1'>
                        <label htmlFor='register-email' className='text-sm font-medium text-slate-700'>Email</label>
                        <input
                            id='register-email'
                            name='email'
                            type='email'
                            placeholder='name@example.com'
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        />
                    </div>

                    <div className='space-y-1'>
                        <label htmlFor='register-password' className='text-sm font-medium text-slate-700'>Password</label>
                        <input
                            id='register-password'
                            name='password'
                            type='password'
                            placeholder='Create a password'
                            value={formData.password}
                            onChange={handleInputChange}
                            className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        />
                    </div>

                    <div className='space-y-1'>
                        <label htmlFor='register-confirm-password' className='text-sm font-medium text-slate-700'>Confirm Password</label>
                        <input
                            id='register-confirm-password'
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm your password'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                        />
                    </div>

                    <button
                        type='submit' disabled={formData.confirmPassword !== formData.password && formData.password!=="" }
                        className='w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors'
                    >
                        Create Account
                    </button>
                </form>

                <p className='mt-5 text-center text-sm text-slate-600'>
                    Already have an account?{' '}
                    <Link to='/auth/login' className='font-medium text-blue-600 hover:text-blue-700'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
