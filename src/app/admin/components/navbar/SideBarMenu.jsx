'use client'
import React from 'react'
import { HiMenuAlt2 } from "react-icons/hi";
import { useSidebarStore } from '@/app/store/useSidebarStore';
import { RiMenuFold2Line } from "react-icons/ri";

function SideBarMenu() {

    const toggle = useSidebarStore((state) => state.toggle);
    const isOpen = useSidebarStore((state) => state.isOpen);


    return (
        <RiMenuFold2Line onClick={toggle} className={`text-2xl md:hidden translate-all duration-300 ${isOpen ? '-scale-x-100' : ''} `} />
    )
}

export default SideBarMenu