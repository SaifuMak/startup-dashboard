'use client'
import React from 'react'
import { FaPowerOff } from "react-icons/fa6";
import { Logout } from '@/app/actions/auth';
import { toast } from 'sonner';

function LogoutButton() {


    const handleLogout = async () => {
        await Logout()
        toast.success('logout successfull')
        window.location.replace("/admin/login");

    }
    return (
        <button onClick={handleLogout} className=" flex items-center justify-center"><FaPowerOff className='text-sm mr-1' />Logout</button>
    )
}

export default LogoutButton