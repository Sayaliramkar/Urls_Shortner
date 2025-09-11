
import React, { useState } from 'react'
import { registerUser } from '../apis/user.api'; 
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice';
import { useNavigate } from '@tanstack/react-router';
// Adjust the import path as necessary

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await registerUser(name, email, password);
      setLoading(false)
      
        dispatch(login(data.user))
        navigate({to: '/dashboard'})
        setLoading(false)
      
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div  className="bg-white px-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && 
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        }
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-gray-700 text-sm font-bold">Full Name</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
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
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account? <span onClick={() => state(true)} className="text-blue-500 hover:underline cursor-pointer">Login</span>
          </p>
        </div> 
      </div>
    </div>
  )
}

export default RegisterForm

