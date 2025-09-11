import { Outlet } from '@tanstack/react-router'
import LoginForm from './components/loginForm'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

function RootLayout() {
  return  (
    <>
      <Navbar />
      <Outlet />
    </>
  )
 
    
}

export default RootLayout


