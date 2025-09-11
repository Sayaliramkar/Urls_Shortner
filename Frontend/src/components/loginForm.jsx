import React, { useState } from 'react'
import { loginUser } from '../apis/user.api'; // Adjust the import path as necessary
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/authSlice';
import { useNavigate } from '@tanstack/react-router';


const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = useSelector((state) => state.auth);
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  console.log(auth)
  const handleSubmit = async () => {

    setLoading(true)
    setError('')

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user))
      Navigate({to: '/dashboard'})
      setLoading(false)
      console.log('Login successful');

    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className="bg-white px-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error &&
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        }
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-gray-700 text-sm font-bold">Email</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-gray-700 text-sm font-bold">Password</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account? <span onClick={() => state(false)} className="text-blue-600 hover:underline cursor-pointer">Register</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
