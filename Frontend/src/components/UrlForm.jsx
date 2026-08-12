

import { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { createShortUrl } from '../apis/shortUrl.api'
import { useSelector } from 'react-redux' 
import { QueryClient } from '@tanstack/react-query'

function UrlForm() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  // const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customSlug, setCustomSlug] = useState('')
  const { isAuthenticated } = useSelector((state) => state.auth);
  const queryClient = new QueryClient()

  const handleSubmit = async () => {
    // e.preventDefault()
    // if (!url) return

    // setLoading(true)
    // setError('')
    // setShortUrl('')

    try {
      const shortUrl   = await createShortUrl(url, customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
    } catch (err) {
      setError(err.message)
    }
  //     console.error('URL shortening failed:', err)
  //   } finally {
  //     setLoading(false)
  //   }
  // } 
  }

    

//   const mutation = useMutation({
//     mutationFn: handleSubmit,
//     onSuccess: (data) => {
//         setShortUrl(data.data)
//         },
//   })
  

  

  const handleCopy = async () => {
   
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true);

      setTimeout(() => 
        setCopied(false), 2000)
    
  }

  return (
    <>
      <div  className="space-y-4">
        <div>
          <input
            type="url"
            id='url'
            value={url}
            onInput={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
         onClick={handleSubmit}
          type="submit"
        //   disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Url Shorten
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isAuthenticated && (
        <div className="mt-4">
         <label htmlFor='customSlug' className="block text-sm font-medium text-gray-700">
          Custom Url (Optional)
         </label>
         <input
            type="text"
            id='customSlug'
            value={customSlug}
            onInput={(e) => setCustomSlug(e.target.value)}
            placeholder="Enter your custom slug here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium mb-3">Your short URL:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortUrl.split('/').pop()}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-blue-600 text-sm font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors duration-200"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
           <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Test your link →
          </a> 
        </div>
      )}
    </>
  )
}

export default UrlForm
