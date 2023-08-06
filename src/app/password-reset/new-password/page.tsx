'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";

const Page = () => {

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || '')
    }, []);


    const setNewPassword = async () => {
        try {
            if (password.length === 0 || repeatPassword.length === 0) {
                setError('fill in the fields')
                return
            }
            if (password !== repeatPassword) {
                setError('passwords don\'t match')
                return
            }
            const res = await axios.post('/api/users/password-reset/new-password', {token, password})
            console.log(res.data.message)
            setIsUpdated(true)
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="h-screen flex justify-center items-center flex-col">
                {!isUpdated ?
                    <>
                        {
                            token.length > 0
                                ?
                                <>
                                    <h1 className={'text-2xl font-bold mb-6'}>New password</h1>
                                    <form className="shadow-md rounded px-8 pt-6 pb-8">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="password">
                                                New password
                                            </label>
                                            <input
                                                className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                                                id="password"
                                                type="password"
                                                placeholder="******************"
                                                required={true}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"
                                                   htmlFor="repeatPassword">
                                                Repeat password
                                            </label>
                                            <input
                                                className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                                                id="repeatPassword"
                                                type="repeat password"
                                                placeholder="******************"
                                                value={repeatPassword}
                                                required={true}
                                                onChange={(e) => setRepeatPassword(e.target.value)}
                                            />
                                            {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
                                        </div>
                                        {error.length > 0 ? <div className={'text-sm text-red-500'}>{error}</div> : ''}
                                        <div className="flex items-center w-full mt-6">
                                            <button
                                                className="w-full bg-blue-600/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="button"
                                                onClick={setNewPassword}
                                            >
                                                Set new password
                                            </button>
                                        </div>
                                    </form>
                                </>
                                : 'no token'
                        }
                    </>
                    :
                    <>
                        <h1 className={'text-2xl font-bold mb-6'}>Password has been updated!</h1>
                        <Link href={'/login'}>Login</Link>
                    </>
                }

            </div>
        </div>


    );
};

export default Page;