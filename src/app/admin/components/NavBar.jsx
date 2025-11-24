import React from 'react'
import LogoutButton from './navbar/LogoutButton';

function NavBar() {

    return (
        <div className="min-h-[80px] w-full  flex justify-end items-center px-6 text-white bg-[#7C67F5]">
            <LogoutButton/>
        </div>
    )
}

export default NavBar