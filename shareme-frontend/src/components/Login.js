import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwt_decode from 'jwt-decode'

import { client } from '../client'



export default function Login() {
    const navigate = useNavigate()

    function responseGoogle(credentialResponse) {
        const decoded = jwt_decode(credentialResponse.credential)
        const { name, picture, sub } = decoded
        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }
        localStorage.setItem('user', JSON.stringify(decoded))
        client.createIfNotExists(user)
            .then(() => {
                navigate('/', { replace: true })
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative h-full w-full'>
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flec-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img src={logo} width='130px' alt='logo' />
                    </div>
                    <div className='shadow-2x1'>
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;

                    </div>
                </div>
            </div>
        </div>
    )
}

