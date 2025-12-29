"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BiHomeCircle } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { RiPagesLine } from "react-icons/ri";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineDownSquare } from "react-icons/ai";
import { MdDisplaySettings } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { VscCircle } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import Image from "next/image";
import { useSidebarStore } from "@/app/store/useSidebarStore";
import { RiMenuFoldLine } from "react-icons/ri";
import { RiMenuFold2Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

export default function SideBar() {

    const [openMenu, setOpenMenu] = useState(null);

    const pathname = usePathname();
    const isMobile = useMediaQuery({ maxWidth: 767 }); // < md

    // zustand state
    const isOpen = useSidebarStore((state) => state.isOpen);
    const onClose = useSidebarStore((state) => state.close);

    const isActive = (url) => pathname === url;

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };


    return (
        <div className={` max-md:fixed max-md:z-50 max-md:inset-0 ${isOpen ? 'bg-black/50  ' : ''} transition-colors duration-700  pointer-events-none`} >
            <div className={` md:w-72 lg:w-84 md:sticky md:top-0 w-full ${isOpen || !isMobile ? ' translate-x-0 pointer-events-auto' : '-translate-x-200 sm:-translate-x-500'} bg-white duration-1000 ease-in-out transition-transform  font-medium  text-[#17181A] h-screen `}>
                <div className=" min-h-[80px] px-3 flex items-center justify-between border-b border-[#F1F5F7]">
                    {/* Logo */}
                    <div className="relative   bg-white lg:w-[200px] w-[150px]  aspect-[3/1] xl:mx-auto ">
                        <Image
                            src="/image/logo.jpg"
                            alt="logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="flex items-center space-x-7">
                        <img src="/icons/profile.svg" alt="profile" className=" size-9 ml-3 " />
                        <RiMenuFold2Line onClick={onClose} className="text-2xl text-custom-grey-500 -scale-x-100  lg:hidden" />
                    </div>

                </div>

                <div className=" px-2">

                    {/* Search */}
                    <div className=" flex  space-x-2 px-2 py-1.5  rounded-md  mt-4 mb-10 justify-between items-center border border-[#D9E1E7]">
                        <>
                            <span className=" text-xl text-[#809FB8]"><IoIosSearch /></span>
                            <input
                                type="text"
                                placeholder="search something"
                                className="w-full placeholder:text-sm  font-normal outline-none placeholder:text-light-secondary "
                            />
                        </>
                        <img src="/icons/admin-sidebar/search-icon.svg" alt="profile" className=" size-7  " />

                    </div>

                    {/* MENU ITEMS */}
                    <SidebarItem
                        label="Dashboard"
                        icon={<BiHomeCircle className="text-2xl" />}
                        href="/admin/dashboard"
                        active={isActive("/admin/dashboard")}
                        closeSidebar={onClose}
                    />

                    {/* Websites */}
                    <SidebarDropdown
                        label="Websites"
                        icon={<CgWebsite className="text-2xl" />}
                        open={openMenu === "websites"}
                        onClick={() => toggleMenu("websites")}
                        active={pathname.startsWith("/admin/websites")}
                    >
                        <SidebarSubItem
                            label="View All"
                            href="/admin/websites"
                            active={isActive("/admin/websites")}
                            closeSidebar={onClose}
                        />
                        <SidebarSubItem
                            label="Add New"
                            href="/admin/websites/add"
                            active={isActive("/admin/websites/add")}
                            closeSidebar={onClose}
                        />
                    </SidebarDropdown>

                    {/* Analytics */}
                    <SidebarDropdown
                        label="Analytics"
                        icon={<RiPagesLine className="text-2xl" />}
                        open={openMenu === "analytics"}
                        onClick={() => toggleMenu("analytics")}
                        active={pathname.startsWith("/admin/analytics")}
                    >
                        <SidebarSubItem
                            label="Traffic"
                            href="/admin/analytics/traffic"
                            active={isActive("/admin/analytics/traffic")}
                            closeSidebar={onClose}
                        />
                    </SidebarDropdown>

                    {/* Billing */}
                    <SidebarDropdown
                        label="Billing"
                        icon={<AiOutlineShop className="text-2xl" />}
                        open={openMenu === "billing"}
                        onClick={() => toggleMenu("billing")}
                        active={pathname.startsWith("/admin/billing")}
                    >
                        <SidebarSubItem
                            label="Plans"
                            href="/admin/billing/plans"
                            active={isActive("/admin/billing/plans")}
                            closeSidebar={onClose}
                        />
                    </SidebarDropdown>

                    {/* Help */}
                    <SidebarItem
                        label="Help"
                        icon={<AiOutlineDownSquare className="text-2xl" />}
                        href="/admin/help"
                        active={isActive("/admin/help")}
                        closeSidebar={onClose}
                    />

                    {/* Settings */}
                    <SidebarItem
                        label="Settings"
                        icon={<MdDisplaySettings className="text-2xl" />}
                        href="/admin/settings"
                        active={isActive("/admin/settings")}
                        closeSidebar={onClose}
                    />
                </div>
            </div>
        </div>
    );

}


/** BASIC ITEM (NO DROPDOWN) **/
function SidebarItem({ label, icon, href, active, closeSidebar }) {
    return (
        <Link href={href} onClick={closeSidebar}>
            <div
                className={`flex items-center font-normal gap-3 px-4 py-2 rounded-md cursor-pointer mb-2
          ${active ? " bg-admin-violet text-white" : ""}
        `}
            >
                <span >{icon}</span>
                <span>{label}</span>
            </div>
        </Link>
    );
}

/** DROPDOWN ITEM **/
function SidebarDropdown({ label, icon, children, open, onClick, active }) {
    return (
        <div className="mb-2 font-normal ">
            <div
                onClick={onClick}
                className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer
          ${active ? "bg-admin-violet text-white" : "hover:bg-gray-100"}
        `}
            >
                <div className="flex items-center gap-3">
                    <span>{icon}</span>
                    <span>{label}</span>
                </div>
                <FaAngleDown
                    className={`transition-transform duration-300 text-sm ${open ? "rotate-180" : ""}`}
                />
            </div>

            {/* Sub menu */}
            {open && <div className="ml-6 mt-1">{children}</div>}
        </div>
    );
}


/** SUB ITEM **/
function SidebarSubItem({ label, href, active, closeSidebar }) {
    return (
        <Link href={href} onClick={closeSidebar}>
            <div
                className={`px-2 py-2 flex  items-center rounded-lg cursor-pointer  mb-1
          ${active ? "text-admin-violet " : "hover:text-admin-violet"}
        `}
            >
                <span className=" mr-1 font-bold"><VscCircle /></span>
                {label}
            </div>
        </Link>
    );
}
