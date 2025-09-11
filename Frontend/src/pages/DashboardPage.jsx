import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
   <div className='min-h-screen  bg-gray-100 flex flex-col items-center justify-center p-4'>
    <div className='bg-white rounded-lg shadow-md p-8 w-full max-w-4xl'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Url Shortener</h1>
      <UrlForm />
      <UserUrl />
    </div>
   </div>
  )
}

export default DashboardPage