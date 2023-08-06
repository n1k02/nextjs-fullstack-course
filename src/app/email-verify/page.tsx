'use client'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";

const Page = () => {
    const [token, setToken] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);

    const verifyEmail = async () => {
        try {
            const res = await axios.post('/api/users/email-verify', {token})
            setIsVerified(true)
        } catch (e: any) {
            setIsError(true)
            console.log(e.response.data)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyEmail()
        }
    }, [token]);

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <h1 className={'text-4xl'}>Verify email</h1>
            <h2 className={'px-2 bg-orange-500 text-black'}>{token.length ? `${token}` : 'no token'}</h2>
            {isVerified && (
                <div>
                    <h2>Email verified</h2>
                    <Link href={'/login'} className={'text-blue-500'}>
                       Login
                    </Link>
                </div>
            )}
            {isError && (
                <div>
                    <h2 className={'bg-red-500 text-2xl text-black'}>Error</h2>
                </div>
            )}
        </div>
    );
};

export default Page;