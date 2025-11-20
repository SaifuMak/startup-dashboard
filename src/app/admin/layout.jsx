"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AXIOS_INSTANCE from "@/app/lib/axios";
import LoaderIcon from "../components/general-components/LoaderIcon";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkLoginStatus = async () => {
    try {
      await AXIOS_INSTANCE.get("auth-service/check-auth/");

      // If user IS authenticated AND user is on login page → redirect to dashboard
      if (pathname === "/admin/login") {
        router.replace("/admin/dashboard");
      }

    } catch (error) {
      router.replace("admin/login"); // redirect user  
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);


  if (isLoading) {
    return <div className=" w-full h-screen flex-center"><LoaderIcon className=' text-3xl animate-spin text-custom-primary-500' /></div>

  }

  return <div>{children}</div>;
}
