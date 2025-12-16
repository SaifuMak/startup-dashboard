'use client'
import React from 'react'
import { useState } from 'react';
import GeneralMainSettings from '../GeneralMainSettings';
import LoaderIcon from '../../general-components/LoaderIcon';


function WebsiteSettings({ data, updateLocalData }) {


    const settingsTabs = [
        { name: 'Main', component: <GeneralMainSettings data={data} updateLocalData={updateLocalData} /> },
        { name: 'Design', component: null },
        { name: 'Colors', component: null },
        { name: 'Typography', component: null },
        { name: 'SEO', component: null },
        { name: 'Custom Codes', component: null },
    ]

    const [selectedTab, setSelectedTab] = useState('Main');

    const [isLoading, setIsLoading] = useState(false)

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Main':
                return <GeneralMainSettings data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} />;
            case 'Design':
                return <div>Design Coming Soon</div>;
            default:
                return null;
        }
    };


    return (
        <div className=" relative w-full min-h-[70vh]  rounded-lg bg-white   py-10">
            <div className=" border rounded-sm border-[#DADADA] mx-20  flex items-center  ">
                {settingsTabs.map((tab, index) => (
                    <div key={index} className={` w-full  p-2  text-nowrap max-xl:text-sm  flex-1 text-center text-admin-grey-600 font-medium   cursor-pointer ${index === settingsTabs.length - 1 ? '' : 'border-r'} border-[#DADADA]  transition-colors duration-500 ${selectedTab === tab.name ? 'text-white bg-admin-violet' : ' text-[#434343]'}`} onClick={() => setSelectedTab(tab.name)}>
                        {tab.name}
                    </div>
                ))}
            </div>

            <div className=" mt-16 mx-20 ">
                {renderTabContent()}
            </div>

            {isLoading && <div className="  absolute inset-0 flex-center bg-slate-50/10 ">
                <LoaderIcon className='text-admin-violet z-50 animate-spin text-3xl' />
            </div>}
        </div>
    )
}

export default WebsiteSettings