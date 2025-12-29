'use client'
import React from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import { getUserSites } from '@/app/actions/websites'
import { toast } from 'sonner'
import LoaderIcon from '@/app/components/general-components/LoaderIcon'
import WebsiteListingCard from '@/app/components/website/WebsiteListingCard'
import { RiMenuFold2Line } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


function Websites() {

    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filteredSites, setFilteredSites] = useState([]);


    useEffect(() => {
        const fetchSites = async () => {
            const res = await getUserSites();

            if (res.success) {
                setFilteredSites(res.data)
                setSites(res.data);
            } else {
                toast.error(res?.error)
            }

            setLoading(false);
        };

        fetchSites();
    }, []);


    const handleSearchKey = (e) => {

        if (e.key === "Enter") {
            console.log(search);

            const q = search.trim().toLowerCase();

            if (!q) {
                setFilteredSites(sites);   // reset
                return;
            }

            const results = sites.filter((site) =>
                site.primary_domain?.toLowerCase().startsWith(q)
            );

            setFilteredSites(results);
        }
    };



    return (
        <div className=" flex ">
            <SideBar />
            <div className=" w-full min-h-screen flex flex-col bg-admin-light-background ">
                <NavBar />
                {loading ? (
                    <div className=" w-full h-full flex-center ">
                        <LoaderIcon className=' ' />
                    </div>
                ) : (
                    <div className="w-full mx-auto p-8 xl:p-10 2xl:p-16">
                        <div className=" flex max-md:flex-col lg:items-center justify-between">

                            <div className=" flex justify-between">
                                <p className=" text-2xl font-medium"> Websites</p>
                                <button className=" bg-admin-violet md:hidden py-2 px-4 rounded-xl  text-xs lg:font-medium text-white">ADD A WEBSITE +</button>

                            </div>


                            <div className=" flex items-center md:space-x-5 max-md:mt-6">

                                <div className=" flex  max-md:w-full space-x-1 px-2 py-1.5    rounded-lg justify-between items-center border border-[#C8C8C8]">
                                    <div className=" flex  space-x-2">
                                        <span className=" text-xl mt-1 text-[#818181]"><IoIosSearch /></span>
                                        <input
                                            type="text"
                                            placeholder="search a site"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyDown={handleSearchKey}
                                            className="xl:w-[300px] placeholder:text-sm  font-normal outline-none placeholder:text-[#818181] "
                                        />
                                    </div>
                                    <span onClick={() => {
                                        setSearch('')
                                        setFilteredSites(sites)
                                    }} className={` text-custom-grey-500 ${search ? ' opacity-100' : ' opacity-0 pointer-events-none'}`} ><RxCross2 /></span>

                                </div>

                                <button className=" bg-admin-violet max-md:hidden py-2 px-4 rounded-xl  text-sm lg:font-medium text-white">ADD A WEBSITE +</button>
                            </div>

                        </div>  

                        {filteredSites?.length > 0 ? (
                            <WebsiteListingCard data={filteredSites} />

                        ) : (
                            <p className=" w-full mx-auto  text-xl lg:text-2xl text-center mt-10">No Websites Available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Websites