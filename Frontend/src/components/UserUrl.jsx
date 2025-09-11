import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../apis/user.api.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const UserUrl = () => {

    const { data: urls = [], isLoading, isError, error } = useQuery({
        queryKey: ['userUrls'],
        queryFn: getAllUserUrls,
        refetchInterval: 30000,
        staleTime: 0,
    })

    const [copiedId, setCopiedId] = useState(null)

    const handleCopy = async (url, id) => {

        await navigator.clipboard.writeText(url)
        setCopiedId(id)

        setTimeout(() => setCopiedId(null), 2000)


    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                Error loading URLs: {error.message}
            </div>
        )
    }


    if (!urls.urls || urls.urls.length === 0) {
        return (
            <div className='text-centertext-gray-500 my-6 p-4 bg-gray-50 rounded-lg'>
                <svg className='mx-auto h-12 w-12 text-gray-400 mb-3' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className='text-lg font-medium'>No URLs found</p>
                <p className='mt-1'>You haven't shortened any URLs yet.</p>

            </div>
        )
    }

    return (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='p-4 bg-blue-50 border-b border-blue-100'>
                <h2 className='text-xl font-semibold text-gray-800'>Your URLs</h2>
                <p className='text-sm text-gray-600'>All the URLs you have shortened</p>
            </div>

            <div className='overflow-y-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Original URL
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Short URL
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Clicks
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {urls.urls.reverse().map((url) => (
                            <tr key={url._id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4'>
                                    <div className='text-sm text-gray-900 truncate max-w-xs'>
                                        {url.full_url}
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    <a
                                        href={`${API_URL}/${url.short_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-sm text-blue-600 hover:text-blue-800 truncate max-w-xs'
                                    >
                                        {`${API_URL}/${url.short_url}`}
                                    </a>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='text-sm text-gray-500'>
                                        {url.clicks}
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    <button
                                        onClick={() => handleCopy(`${API_URL}/${url.short_url}`, url._id)}
                                        className='text-sm text-blue-600 hover:text-blue-800'
                                    >
                                        {copiedId === url._id ? 'Copied!' : 'Copy'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserUrl
