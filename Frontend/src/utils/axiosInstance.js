import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
})

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('Making request to:', config.url)
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// Response interceptor with comprehensive error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status)
    return response
  },
  (error) => {
    let errorMessage = 'Something went wrong'
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const data = error.response.data
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Bad request'
          break
        case 401:
          errorMessage = 'Unauthorized access'
          break
        case 403:
          errorMessage = 'Access forbidden'
          break
        case 404:
          errorMessage = 'Resource not found'
          break
        case 409:
          errorMessage = data?.message || 'Conflict error'
          break
        case 422:
          errorMessage = data?.message || 'Validation error'
          break
        case 500:
          errorMessage = 'Internal server error'
          break
        case 502:
          errorMessage = 'Bad gateway'
          break
        case 503:
          errorMessage = 'Service unavailable'
          break
        default:
          errorMessage = data?.message || `Request failed with status ${status}`
      }
    } else if (error.request) {
      // Request was made but no response received
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout'
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error - please check your connection'
      } else {
        errorMessage = 'No response from server'
      }
    } else {
      // Something else happened
      errorMessage = error.message || 'Request setup error'
    }
    
    console.error('Axios error:', error)
    return Promise.reject(new Error(errorMessage))
  }
)

export default axiosInstance
