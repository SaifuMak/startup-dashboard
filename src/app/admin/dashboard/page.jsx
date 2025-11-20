'use client'
import { useRouter } from "next/navigation";
import AXIOS_INSTANCE from "@/app/lib/axios";
import { useEffect } from "react";
import SideBar from "../components/SideBar";


export default function Dashboard() {

    const router = useRouter();

    const checkLoginStatus = async () => {

        try {

            const res = await AXIOS_INSTANCE.get("auth-service/check-auth/", {
            });

        } catch (error) {
            // router.push('/login')
        }
        finally {
        }
    };

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <div className=" flex ">
            <SideBar />
            <div className=" w-full h-screen flex-center">
                <p className=" text-3xl"> Dashboard</p>
            </div>
        </div>
    )
}