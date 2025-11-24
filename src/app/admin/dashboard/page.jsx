'use client'
import { useRouter } from "next/navigation";
import AXIOS_INSTANCE from "@/app/lib/axios";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

export default function Dashboard() {

    return (
        <div className=" flex bg-[#F9FBFC] ">
            <SideBar />

            <div className=" w-full h-screen flex flex-col ">
                <NavBar/>
                <div className="  w-full h-full"></div>

                <p className=" text-3xl"> Dashboard</p>
            </div>
        </div>
    )
}