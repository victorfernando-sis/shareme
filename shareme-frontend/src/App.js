import React, { useState, useRef, useEffect, useContext } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { Navbar, Sidebar } from './components'
import logo from './assets/logo.png'
import UserContext from './context/UserContext'

export default function App() {
    const { user } = useContext(UserContext)
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const scrollRef = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/login')
        scrollRef.current.scrollTo(0, 0)
    }, [])

    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'>
                <Sidebar user={user && user} />
            </div>
            <div className=' flex md:hidden flex-row'>
                <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                    <HiMenu fontSize={40} className="cursor-poiter" onClick={() => setToggleSidebar(true)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className='w-28' />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="logo" className='w-12' />
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className='absolute w-full flex justify-end items-center p-2'>
                            <AiFillCloseCircle fontSize={30} className="cursor-poiter" onClick={() => setToggleSidebar(false)} />
                        </div>
                        <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                    </div>
                )}
            </div>
            <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <div className='bg-gray-50 px-5'>
                    <Navbar />
                </div>
                <Outlet />
            </div>
        </div>
    )
}

