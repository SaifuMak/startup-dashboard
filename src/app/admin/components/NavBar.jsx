import React from 'react'
import { FaPowerOff } from "react-icons/fa6";
import { Logout } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";


function NavBar() {

    const router = useRouter()

    const handleLogout = async () => {
        await Logout()
        toast.success('logout successfull')
        // router.replace("/admin/login")
        window.location.replace("/admin/login");

    }

    return (
        <div className="min-h-[80px] w-full  flex justify-end items-center px-6 text-white bg-[#7C67F5]">
            <p onClick={handleLogout} className=" flex items-center justify-center"><FaPowerOff className='text-sm mr-1' />Logout</p>
        </div>
    )
}

export default NavBar