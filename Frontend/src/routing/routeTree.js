import React from 'react'
import { createRootRoute} from '@tanstack/react-router'
import RootLayout from '../App.jsx'
import { homePageRoute } from './homePage.js'
import { authRoute } from './auth.route.js'
import { dashboardRoute } from './dashboard.js'

export const rootRoute = createRootRoute({
  component: RootLayout 
})

 export const routeTree = rootRoute.addChildren([homePageRoute,
     authRoute,
     dashboardRoute])

