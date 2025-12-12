'use client'
import LoaderIcon from "@/app/components/general-components/LoaderIcon"
import NavBar from "@/app/admin/components/NavBar"
import SideBar from "@/app/admin/components/SideBar"
import { SlGlobe } from "react-icons/sl";
import CommingSoonSettings from "@/app/components/settings/CommingSoonSettings";
import { getSiteDetails } from "@/app/actions/websites";
import { useEffect, useState } from "react";

export default function SettingsClient({ websiteUrl }) {

    const [websiteData, setWebsiteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const updateLocalData = (updates) => {
        setWebsiteData(prev => ({ ...prev, ...updates }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const { success, data } = await getSiteDetails(websiteUrl);
            if (success) {
                setWebsiteData(data);
                setIsLoading(false);
                console.log(data);
            }
        };

        fetchData();
    }, [websiteUrl]);

   

    return (
        <div className=" flex ">
            <SideBar />
            <div className=" w-full  min-h-screen flex flex-col  bg-admin-light-background ">
                <NavBar />

                <div className="xl:w-10/12 p-8 xl:p-10 2xl:p-16">

                    <div className=" flex items-center justify-between mb-8 ">

                        <div className="flex  items-center space-x-5  ">
                            <h1 className=" text-[22px] font-semibold ">Settings</h1>
                            <div className=" flex items-center text-[#6E6E6E]  space-x-2 mt-1 xl:space-x-2">

                                <SlGlobe className='xl:text-lg' />
                                <p className=" text-admin-grey-600  xl:text-lg ">{websiteData?.primary_domain}</p>
                            </div>
                        </div>

                        <button className=" px-8 py-1.5 bg-admin-violet text-sm font-medium text-white rounded-xl">GO BACK</button>
                    </div>

                    {isLoading ? (
                        <div className=" flex items-center justify-center min-h-[60vh] ">
                            <LoaderIcon />
                        </div>
                    ) : (

                        websiteData?.site_type === 'comming_soon_site' && <CommingSoonSettings data={websiteData} updateLocalData={updateLocalData} />
                    )}

                </div>

            </div>

        </div>
    )
}