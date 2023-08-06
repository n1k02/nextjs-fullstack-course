'use client'
import {useState} from "react";
import {sendEmail} from "@/helpers/mailer";
import axios from "axios";

const Page = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');
    const onReset = async  () => {
        try {
            const res = await axios.post('api/users/password-reset/send-mail', {email})
            setIsSent(true)
            console.log(res)
        } catch (e: any) {
            setError(e)
            console.log('error when reset password: ' + e)
        }
    }

    return (
        <div>
            <div className="h-screen flex justify-center items-center flex-col">
                <h1 className={'text-2xl font-bold mb-6'}>Reset password</h1>
                {!isSent ?
                    <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-700"
                                   id="email"
                                   type="text"
                                   placeholder="email"
                                   value={email}
                                   onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        {error.length > 0 ? <div className={'mt-1 text-sm text-red-500'}>Error: {error}</div> : ''}
                        <button className="mt-4 bg-blue-600/70 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="button"
                                onClick={onReset}
                        >
                            Reset
                        </button>
                    </form>
                    :
                    <h1>Password restore page url has been sent to your email!</h1>
                }

            </div>
        </div>
    );
};

export default Page;