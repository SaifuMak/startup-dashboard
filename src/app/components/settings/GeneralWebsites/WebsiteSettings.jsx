'use client'
import React from 'react'
import { useState } from 'react';
import GeneralMainSettings from '../GeneralMainSettings';
import LoaderIcon from '../../general-components/LoaderIcon';
import GeneralMainDesign from '../GeneralMainDesign';
import SettingsTabs from '../Componets/SettingsTabs';
import GeneralColorSettings from '../GeneralColorSettings';
import { WEBSITE_COLOR_THEME_FIELDS } from '@/app/data/ColorThemes';

// this deals with general website settings
function WebsiteSettings({ data, updateLocalData }) {

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
                return <GeneralMainSettings data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} />;
            case 'Design':
                return <GeneralMainDesign data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} isLoading={isLoading} />;
            case 'Colors':
                return <GeneralColorSettings data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} isLoading={isLoading} colorThemes={WEBSITE_COLOR_THEME_FIELDS} />;
            default:
                return null;
        }
    };


    return (
        <div className=" relative w-full min-h-[70vh]  bg-white rounded-lg  py-5  md:py-10">

             <SettingsTabs
                tabs={settingsTabs}
                selectedTab={selectedTab}
                onChange={setSelectedTab}
            />

            <div className=" mt-16 mx-5 lg:mx-10 xl:mx-20 ">
                {renderTabContent()}
            </div>

            {isLoading && <div className=" fixed inset-0 flex-center  bg-slate-400/10 ">
                <LoaderIcon className='text-admin-violet z-50 animate-spin md:text-3xl text-4xl' />
            </div>}
        </div>
    )
}

export default WebsiteSettings