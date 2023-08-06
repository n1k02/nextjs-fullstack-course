'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


const SignupPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [buttonActive, setButtonActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log('signup success', response.data)
            router.push('/login')
        } catch (e: any) {
            setLoading(false)
            console.log('signup failed', e.message)

            toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [user]);

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <h1 className={'text-2xl font-bold mb-6'}>{loading ? 'Loading...' : 'Sign Up '}</h1>
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                        id="username"
                        type="text"
                        placeholder="username"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                        id="email"
                        type="text"
                        placeholder="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
                </div>
                <div className="flex items-center w-full">
                    <button
                        className="bg-blue-600/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={onSignup}
                    >
                        {buttonActive ? "Sign Up" : 'No Sign Up'}
                    </button>
                    <Link href={'/login'}
                          className="ml-auto inline-block font-bold text-sm text-blue-500 hover:text-blue-800">
                        Or Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;