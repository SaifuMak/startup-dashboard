"use client";
import { useState } from "react";
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

export default function SideBar() {
    const [openMenu, setOpenMenu] = useState(null);

    const pathname = usePathname();

    const isActive = (url) => pathname === url;

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="w-64 bg-white border-r  font-medium  text-[#17181A] h-screen p-4">
            {/* Logo */}
            <div className="text-xl font-bold mb-6">Startup Site</div>

            {/* Search */}
            <div className=" flex  space-x-2 px-3 py-2  rounded mb-10 items-center border border-custom-grey-300">
                <span className=" text-xl text-custom-grey-500"><IoIosSearch /></span>
                <input
                    type="text"
                    placeholder="Search something"
                    className="w-full placeholder:text-sm placeholder:text-custom-grey-400 "
                />
            </div>

            {/* MENU ITEMS */}
            <SidebarItem
                label="Dashboard"
                icon={<BiHomeCircle className="text-lg" />}
                href="/admin/dashboard"
                active={isActive("/admin/dashboard")}
            />

            {/* Websites */}
            <SidebarDropdown
                label="Websites"
                icon={<CgWebsite className="text-lg" />}
                open={openMenu === "websites"}
                onClick={() => toggleMenu("websites")}
                active={pathname.startsWith("/admin/websites")}
            >
                <SidebarSubItem
                    label="View All"
                    href="/admin/websites"
                    active={isActive("/admin/websites")}
                />
                <SidebarSubItem
                    label="Add New"
                    href="/admin/websites/add"
                    active={isActive("/admin/websites/add")}
                />
            </SidebarDropdown>

            {/* Analytics */}
            <SidebarDropdown
                label="Analytics"
                icon={<RiPagesLine className="text-lg" />}
                open={openMenu === "analytics"}
                onClick={() => toggleMenu("analytics")}
                active={pathname.startsWith("/admin/analytics")}
            >
                <SidebarSubItem
                    label="Traffic"
                    href="/admin/analytics/traffic"
                    active={isActive("/admin/analytics/traffic")}
                />
            </SidebarDropdown>

            {/* Billing */}
            <SidebarDropdown
                label="Billing"
                icon={<AiOutlineShop className="text-xl" />}
                open={openMenu === "billing"}
                onClick={() => toggleMenu("billing")}
                active={pathname.startsWith("/admin/billing")}
            >
                <SidebarSubItem
                    label="Plans"
                    href="/admin/billing/plans"
                    active={isActive("/admin/billing/plans")}
                />
            </SidebarDropdown>

            {/* Help */}
            <SidebarItem
                label="Help"
                icon={<AiOutlineDownSquare className="text-xl" />}
                href="/admin/help"
                active={isActive("/admin/help")}
            />

            {/* Settings */}
            <SidebarItem
                label="Settings"
                icon={<MdDisplaySettings className="text-xl" />}
                href="/admin/settings"
                active={isActive("/admin/settings")}
            />
        </div>
    );

}


/** BASIC ITEM (NO DROPDOWN) **/
function SidebarItem({ label, icon, href, active }) {
    return (
        <Link href={href}>
            <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer mb-2
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
        <div className="mb-2">
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
function SidebarSubItem({ label, href, active }) {
    return (
        <Link href={href}>
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
