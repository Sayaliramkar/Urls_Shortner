import { Link } from '@tanstack/react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { useMutation } from '@tanstack/react-query'
import { logoutUser } from '../apis/user.api'

const Navbar = ( ) => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout())
    },
    onError: (error) => {
      console.error('Logout error:', error)
      dispatch(logout())
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <nav className="bg-white border border-b-black">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - App name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
              URL Shortener
            </Link>
          </div>

          {/* Right side - Login */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="text-gray-800 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </Link>
                <span className="text-gray-800">Welcome, {user?.name || user?.email}</span>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            )}
           
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

