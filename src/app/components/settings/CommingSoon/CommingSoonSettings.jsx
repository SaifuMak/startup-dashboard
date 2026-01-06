'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import GeneralMainSettings from '../GeneralMainSettings';
import LoaderIcon from '../../general-components/LoaderIcon';
import GeneralMainDesign from '../GeneralMainDesign';
import GeneralColorSettings from '../GeneralColorSettings';
import GeneralTypographySettings from '../GeneralTypographySettings';
import SettingsTabs from '../Componets/SettingsTabs';
import { COMMING_SOON_COLOR_THEME_FIELDS } from '@/app/data/ColorThemes';
import { COMING_SOON_WEBSITE_TYPOGRAPHY_FIELDS } from '@/app/data/Typography';
import { getTemplatesByCategory } from '@/app/actions/templates';

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
    const [templates, setTemplates] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    // keeping the changed actions in parent 
    const [isColorChanged, setIsColorChanged] = useState(false)
    const [isTypographyChanged, setIsTypographyChanged] = useState(false)

    useEffect(() => {
        setIsLoading(true);

        const fetchTemplates = async () => {
            const { success, data: templatesData } = await getTemplatesByCategory(data.site_type);
            if (success) {
                setTemplates(templatesData);
            }
            setIsLoading(false);
        };

        fetchTemplates();

    }, [data.site_type])



    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Main':
                // main settings tab this is common for all site types
                return <GeneralMainSettings data={data} updateLocalData={updateLocalData} setIsLoading={setIsLoading} />;
            case 'Design':
                //  design settings tab this is common for all site types
                return <GeneralMainDesign data={data}
                    updateLocalData={updateLocalData}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    templates={templates} />;
            case 'Colors':
                return <GeneralColorSettings data={data}
                    updateLocalData={updateLocalData}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    colorThemes={COMMING_SOON_COLOR_THEME_FIELDS}
                    isColorChanged={isColorChanged}
                    setIsColorChanged={setIsColorChanged} />;

            case 'Typography':
                return <GeneralTypographySettings
                    data={data}
                    updateLocalData={updateLocalData}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    typographyFields={COMING_SOON_WEBSITE_TYPOGRAPHY_FIELDS}
                    isTypographyChanged={isTypographyChanged}
                    setIsTypographyChanged={setIsTypographyChanged}
                />;

            default:
                return null;
        }
    };

    return (
        <div className=" relative w-full min-h-[70vh]  rounded-lg bg-white py-10">

            <SettingsTabs
                tabs={settingsTabs}
                selectedTab={selectedTab}
                onChange={setSelectedTab}
            />

            <div className=" mt-16 xl:mx-20 mx-5 ">
                {/* conditional rendering of tab content based on selected tab this prevents the slate state  */}
                {renderTabContent()}
            </div>

            {isLoading && <div className=" fixed inset-0 flex-center  bg-slate-400/10 ">
                <LoaderIcon className='text-admin-violet z-50 animate-spin md:text-3xl text-4xl' />
            </div>}
        </div>
    )
}

export default CommingSoonSettings