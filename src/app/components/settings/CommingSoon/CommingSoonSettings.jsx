'use client'
import React from 'react'
import { useState } from 'react';
import GeneralMainSettings from '../GeneralMainSettings';
import LoaderIcon from '../../general-components/LoaderIcon';
import GeneralMainDesign from '../GeneralMainDesign';

// this deals with comming soon site settings
function CommingSoonSettings({ data, updateLocalData }) {

    // used for tab selection
    const settingsTabs = [
        { name: 'Main' },
        { name: 'Design' },
        { name: 'Colors' },
        { name: 'Typography' },
        { name: 'SEO' },
        { name: 'Custom Codes' },
    ]

    const [selectedTab, setSelectedTab] = useState('Main');

    const [isLoading, setIsLoading] = useState(false)

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Main':
                // main settings tab this is common for all site types
                return <GeneralMainSettings data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} />;
            case 'Design':

                //  design settings tab this is common for all site types
                return <GeneralMainDesign data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} isLoading={isLoading} />;
            default:
                return null;
        }
    };


    return (
        <div className=" relative w-full min-h-[70vh]  rounded-lg bg-white   py-10">
            {/* tabs for different settings sections */}
            <div className=" border rounded-sm border-[#DADADA] mx-20  flex items-center  ">
                {settingsTabs.map((tab, index) => (
                    <div key={index} className={` w-full  p-2  text-nowrap max-xl:text-sm  flex-1 text-center text-admin-grey-600 font-medium   cursor-pointer ${index === settingsTabs.length - 1 ? '' : 'border-r'} border-[#DADADA]  transition-colors duration-500 ${selectedTab === tab.name ? 'text-white bg-admin-violet' : ' text-[#434343]'}`} onClick={() => setSelectedTab(tab.name)}>
                        {tab.name}
                    </div>
                ))}
            </div>

            <div className=" mt-16 mx-20 ">
                {/* conditional rendering of tab content based on selected tab this prevents the slate state  */}
                {renderTabContent()}
            </div>

            {isLoading && <div className="  absolute inset-0 flex-center bg-slate-50/10 ">
                <LoaderIcon className='text-admin-violet z-50 animate-spin text-3xl' />
            </div>}
        </div>
    )
}

export default CommingSoonSettings