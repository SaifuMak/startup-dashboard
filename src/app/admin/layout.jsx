"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoginStatus } from "../actions/auth";
import { toast } from "sonner";
import LoaderIcon from "../components/general-components/LoaderIcon";


export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkLoginStatus = async () => {
    const { success } = await LoginStatus();

    // If user is logged in
    if (success) {
     
      if (pathname === "/admin/dashboard") {
        setIsLoading(false);
        return;
      }

      // Logged in but trying to see login page → redirect away
      if (pathname === "/admin/login") {
        router.replace("/admin/dashboard");
        return;
      }

      // Logged in and on some other page → allow load
      setIsLoading(false);
      return;
    }

    // If NOT logged in
    if (pathname !== "/admin/login") {
      toast.error("Your session has expired. Please log in again.");
      router.replace("/admin/login");
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]); 

  if (isLoading) {
    return (
      <div className="w-full h-screen flex-center">
        <LoaderIcon className="text-3xl animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
