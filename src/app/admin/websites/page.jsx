'use client'
import React from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import { getUserSites } from '@/app/actions/websites'
import { toast } from 'sonner'
import LoaderIcon from '@/app/components/general-components/LoaderIcon'
import WebsiteListingCard from '@/app/components/website/WebsiteListingCard'

function Websites() {

    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSites = async () => {
            const res = await getUserSites();

            if (res.success) {

                setSites(res.data); // store sites
                console.log(sites);

            } else {
                toast.error(res?.error)
            }

            setLoading(false);
        };

        fetchSites();
    }, []);


    return (
        <div className=" flex ">
            <SideBar />
            <div className=" w-full min-h-screen flex flex-col bg-admin-light-background ">
                <NavBar />
                {loading ? (
                    <div className=" w-full h-full flex-center ">
                        <LoaderIcon className='text-xl ' />
                    </div>
                ) : (
                    <div className="w-full mx-auto p-16">
                        <p className=" text-2xl font-medium"> Websites</p>
                        <WebsiteListingCard data={sites?.websites} name='General website' />
                        <WebsiteListingCard data={sites?.coming_soon_sites} name='Comming soon website' />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Websites