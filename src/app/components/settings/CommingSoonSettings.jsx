'use client'
import React from 'react'
import { useState } from 'react';
import GeneralMainSettings from './GeneralMainSettings';

function CommingSoonSettings({ data }) {


    const settingsTabs = [
        { name: 'Main', component: <GeneralMainSettings /> },
        { name: 'Design', component: null },
        { name: 'Colors', component: null },
        { name: 'Typography', component: null },
        { name: 'SEO', component: null },
        { name: 'Custom Codes', component: null },
    ]

    const [selectedTab, setSelectedTab] = useState({ name: 'Main', component: <GeneralMainSettings /> })

    return (
        <div className=" w-full min-h-[70vh]  rounded-lg bg-white px-20  py-10">
            <div className=" border rounded-sm overflow-hidden border-[#DADADA]  flex items-center  ">
                {settingsTabs.map((tab, index) => (
                    <div key={index} className={` p-3  flex-1 text-center text-admin-grey-600 font-medium   cursor-pointer ${index === settingsTabs.length - 1 ? '' : 'border-r'} border-[#DADADA]  transition-colors duration-500 ${selectedTab.name === tab.name ? 'text-white bg-admin-violet' : ' text-[#434343]'}`} onClick={() => setSelectedTab(tab)}>
                        {tab.name}
                    </div>
                ))}
            </div>

            <div className=" mt-16 ">
                {selectedTab.component}
            </div>

        </div>
    )
}

export default CommingSoonSettings