'use client'
import LoaderIcon from "@/app/components/general-components/LoaderIcon"
import NavBar from "@/app/admin/components/NavBar"
import SideBar from "@/app/admin/components/SideBar"
import { SlGlobe } from "react-icons/sl";
import CommingSoonSettings from "@/app/components/settings/CommingSoon/CommingSoonSettings";
import WebsiteSettings from "@/app/components/settings/GeneralWebsites/WebsiteSettings";
import { getSiteDetails } from "@/app/actions/websites";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

// setting client main component
export default function SettingsClient({ websiteUrl }) {

    const [websiteData, setWebsiteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const updateLocalData = (updates) => {
        setWebsiteData(prev => ({ ...prev, ...updates }));
    };

    


    useEffect(() => {
        const fetchData = async () => {
            // fetch site details using the provided websiteUrl
            const { success, data } = await getSiteDetails(websiteUrl);
            console.log(data)
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
            <div className=" w-full  min-h-screen flex flex-col   bg-admin-light-background ">
                <NavBar />

                <div className=" lg:w-11/12 2xl:w-10/12 p-5  md:p-8 xl:p-10 2xl:p-16">

                    <div className="flex items-center justify-between mb-8 ">

                        <div className="flex max-md:flex-col   md:items-center md:space-x-5  ">
                            <h1 className=" text-[22px] font-semibold ">Settings</h1>
                            <div className=" flex items-center text-[#6E6E6E]  space-x-2 mt-1 xl:space-x-2">

                                <SlGlobe className='xl:text-lg' />
                                <a
                                    href={`https://${websiteData?.primary_domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-admin-grey-600 flex group hover:text-black cursor-pointer xl:text-lg"
                                >
                                    {websiteData?.primary_domain}
                                    <span className="flex items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300 rotate-320">
                                        <IoIosArrowRoundForward />
                                    </span>
                                </a>

                            </div>
                        </div>
                        <button className=" lg:px-8 px-5 py-1.5 bg-admin-violet lg:text-sm text-xs text-nowrap font-medium text-white rounded-sm md:rounded-xl">GO BACK</button>
                    </div>


                    {isLoading ? (
                        <div className=" flex items-center justify-center min-h-[60vh] ">
                            <LoaderIcon />
                        </div>
                    ) : (
                        // settings type for different site types
                        <>
                            {websiteData?.site_type === 'comming_soon_site' && <CommingSoonSettings data={websiteData} updateLocalData={updateLocalData} />}
                            {websiteData?.site_type === 'website' && <WebsiteSettings data={websiteData} updateLocalData={updateLocalData} />}
                        </>
                    )}

                </div>

            </div>

        </div>
    )
}
