'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [buttonActive, setButtonActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const onLogin = async () => {
        if(!user.email.length || !user.password.length) {
            setError('fill in the fields')
            return
        }
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log('login success', response.data)
            router.push('/profile')
        } catch (e: any) {
            setLoading(false)
            if(e.request.status === 401) {
                setError('Invalid login or password')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email && user.password) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [user]);


    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <h1 className={'text-2xl font-bold mb-6'}>{loading ? 'Loading...' : 'Login'}</h1>
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                           id="email"
                           type="text"
                           placeholder="email"
                           value={user.email}
                           onChange={(e)=> setUser({...user, email: e.target.value})}
                           onInput={()=> {setError('')}}
                    />
                </div>
                <div className="mt-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                           id="password"
                           type="password"
                           placeholder="******************"
                           value={user.password}
                           onChange={(e)=> setUser({...user, password: e.target.value})}
                           onInput={()=> {setError('')}}
                    />
                    {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
                </div>
                {error ? <div className={'text-sm text-red-500'}>{error}</div> : ''}
                <div className="flex items-center w-full mt-6">
                    <button className="bg-blue-600/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={onLogin}
                    >
                        {buttonActive ? "Login" : 'No Login'}
                    </button>
                    <Link href={'/signup'} className="ml-auto inline-block font-bold text-sm text-blue-500 hover:text-blue-800">
                        Or Sign Up
                    </Link>
                </div>
                <Link href={'/password-reset'} className={'block w-full text-center text-sm mt-4 text-gray-500'}>forgot the password?</Link>
            </form>
        </div>
    );
};

export default LoginPage;