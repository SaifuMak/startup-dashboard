import React from 'react'
import LogoutButton from './navbar/LogoutButton';
import SideBarMenu from './navbar/SideBarMenu';

function NavBar() {

    return (
        <div className="md:min-h-[80px] min-h-[60px] w-full space-x-6  flex justify-end items-center px-6 text-white bg-[#7C67F5]">
            <SideBarMenu/>
            <LogoutButton/>
        </div>
    )
}

export default NavBar