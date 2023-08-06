'use client'
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";

const ProfilePage = () => {
    const [data, setData] = useState('none');
    const router = useRouter()
    const logout = async ()=> {
        try {
            const response = await axios.get('/api/users/logout')
            console.log('logout successful')
            toast.error('logout successful')
            router.push('/login')
        } catch (e: any) {
            console.log(e.message)
            toast.error(e.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data._id)
    }

    return (
        <div className={'flex flex-col items-center justify-center min-h-screen py-2'}>
            <h1>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <h2 className={'text-green-400'}>
                Data: {data === 'none' ? 'Nothing': <Link className={'underline'} href={`/profile/${data}`}>
                {data}
            </Link>}
            </h2>
            <hr/>
            <button
                className={'bg-blue-500 rounded text-black font-bold py-2 px-4'}
                onClick={logout}
            >
                Logout
            </button>
            <button
                className={'bg-gray-500 rounded text-black font-bold py-2 px-4'}
                onClick={getUserDetails}
            >
                Get user details
            </button>
        </div>
    );
};

export default ProfilePage;