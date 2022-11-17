import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'

import App from './App'
import Login from './components/Login'
import ErrorPage from "./error-page";
import './index.css'
import { CreatePin, Feed, PinDetail, Search, UserProfile } from './components';
import { UserProvider } from './context/UserContext';
import { SearchProvider } from './context/SearchContext';
import Pins from './container/Pins';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Pins />
            },
            {
                path: "create-pin",
                element: <CreatePin />
            },
            {
                path: "pin-detail/:pinId",
                element: <PinDetail />
            },
            {
                path: "user-profile/:userId",
                element: <UserProfile />
            },
            {
                path: "category/:categoryId",
                element: <Feed />
            },
            {
                path: "search",
                element: <Search />
            },

        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
        <UserProvider>
            <SearchProvider>
                <RouterProvider router={router} />
            </SearchProvider>
        </UserProvider>
    </GoogleOAuthProvider>
)
