import { getTemplatesByCategory, updateSiteTheme } from "@/app/actions/templates";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

// this deals with design settings common for all site types(design tab)
export default function GeneralMainDesign({ data, updateLocalData, setIsLoading, isLoading }) {

    const settingsData = data?.settings || {};

    const [templates, setTemplates] = useState([]);
    const [selectedLayoutTheme, setSelectedLayoutTheme] = useState('light')
    const [selectedTemplateKeyForSwitching, setselectedTemplateKeyForSwitching] = useState(null)
    const [templateSwitchingConfirmatiom, setTemplateSwitchingConfirmatiom] = useState(false)

    const [ClickedOrHoveredTemplateKey, setClickedOrHoveredTemplateKey] = useState(null)

    const handleTemplateSwitch = (newTemplateKey) => {
        setselectedTemplateKeyForSwitching(newTemplateKey)
        setTemplateSwitchingConfirmatiom(true)
    }

    const confirmTemplateChange = async () => {
        if (isLoading) return;
        toast.dismiss();
        setIsLoading(true);
        const payload = {
            host: data.primary_domain,
            theme: selectedLayoutTheme,
            template_key: selectedTemplateKeyForSwitching
        }
        const { success } = await updateSiteTheme(payload)

        if (success) {
            toast.success('Template updated successfully')

            // updated local data to reflect changes immediately
            updateLocalData({
                settings: {
                    ...data.settings,
                    templateKey: selectedTemplateKeyForSwitching,
                    theme: selectedLayoutTheme
                }
            });
            setIsLoading(false);
            setTemplateSwitchingConfirmatiom(false)
            setselectedTemplateKeyForSwitching(null)
        }
        else {
            toast.error('Failed to update template')
            setIsLoading(false);
            setTemplateSwitchingConfirmatiom(false)
            setselectedTemplateKeyForSwitching(null)
        }
    };


    useEffect(() => {
        setIsLoading(true);

        const fetchTemplates = async () => {
            const { success, data: templatesData } = await getTemplatesByCategory(data.site_type);
            if (success) {
                console.log('Templates data:', templatesData);
                setTemplates(templatesData);
            }
            setIsLoading(false);
        };

        fetchTemplates();

    }, [])


    return (
        <div className=" w-full max-md:text-sm">

            <div className=" flex md:justify-between max-md:flex-col max-md:space-y-5 2xl:w-8/12  ">
                <div className="">
                    <h2 className=" text-xl 2xl:text-2xl font-semibold ">Color theme</h2>
                    <p className=" text-[#7D7878] 2xl:text-lg mt-1">Choose a style for your site</p>
                </div>

                <div className=" flex  items-center  space-x-10">
                    <div onClick={() => setSelectedLayoutTheme('light')} className=" cursor-pointer  border px-7 py-1 rounded-sm  border-admin-violet-border flex items-center  space-x-2">
                        <div className={`${selectedLayoutTheme === 'light' ? ' bg-admin-violet' : 'border border-[#7453EC]'} size-3 rounded-full`} ></div>
                        <p className=" font-medium">Light</p>
                    </div>
                    <div onClick={() => setSelectedLayoutTheme('dark')} className=" cursor-pointer  border px-7 py-1 rounded-sm border-admin-violet-border flex items-center space-x-2">
                        <div className={`${selectedLayoutTheme === 'dark' ? ' bg-admin-violet' : ' border border-[#7453EC] bg-slate-50'} size-3 rounded-full`} ></div>
                        <p className="font-medium">Dark</p>
                    </div>
                </div>
            </div>

            {/* templates section */}
            <div className="grid lg:grid-cols-3 mt-10 w-full gap-10">
                {templates.map((template, index) => {

                    const isHoveredOrClicked = ClickedOrHoveredTemplateKey === template.key;

                    return (
                        <div
                            onMouseEnter={() => setClickedOrHoveredTemplateKey(template.key)}
                            onMouseLeave={() => setClickedOrHoveredTemplateKey(null)}
                            onClick={() =>  isHoveredOrClicked ? setClickedOrHoveredTemplateKey(null) : setClickedOrHoveredTemplateKey(template.key)}


                            className="" key={index}>

                            <div
                                className={`relative   h-[350px] border bg-gray-100 ${settingsData.templateKey === template.key && settingsData.theme === selectedLayoutTheme ? ' border-admin-violet-border' : ' border-slate-200'} rounded-md overflow-hidden  w-full`}
                            >
                                {/* Light */}
                                <img
                                    src={template.light_preview_image_url}
                                    alt=""
                                    className={`absolute inset-0 w-full h-full  object-cover
                            transition-opacity duration-500 ease-in-out
                            ${selectedLayoutTheme === "light" ? "opacity-100" : "opacity-0"}`}
                                />

                                {/* Dark */}
                                <img
                                    src={template.dark_preview_image_url}
                                    alt=""
                                    className={`absolute inset-0 w-full h-full object-cover
                            transition-opacity duration-500 ease-in-out
                            ${selectedLayoutTheme === "dark" ? "opacity-100" : "opacity-0"}`}
                                />

                                <div className={`absolute ${isHoveredOrClicked ? "opacity-100" : "opacity-0"} transition-opacity duration-500 inset-0 w-full h-full bg-black/20 z-10`}></div>

                                <div className=" h-12 z-20  text-sm absolute bottom-0 font-medium text-white w-full flex-center">
                                    {(settingsData.templateKey === template.key && settingsData.theme === selectedLayoutTheme) ?
                                        // currently active template
                                        (<div className=" w-full   flex-center h-full bg-[#099613]">CURRENTLY ACTIVE</div>)
                                        : (
                                            // options to preview or choose template
                                            <div className={` ${isHoveredOrClicked ? "translate-y-0 opacity-100" : "opacity-0  translate-y-12"} transition-all duration-500 flex-center w-full h-full`}>
                                                <a
                                                    href={selectedLayoutTheme === "light" ? template.light_mode_preview : template.dark_mode_preview}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-1/2 h-full cursor-pointer bg-white flex-center text-[#767676]"
                                                >
                                                    <IoEyeOutline className="mr-1 text-xl" />
                                                    PREVIEW
                                                </a>

                                                <div onClick={() => handleTemplateSwitch(template.key)} className="w-1/2  h-full cursor-pointer  flex-center bg-[#099613] text-white ">CHOOSE</div>
                                            </div>)}
                                </div>
                            </div>
                            {/* template key display */}
                            <p className=" w-full mx-auto capitalize text-center mt-3 font-medium">{template.key}</p>
                        </div>
                    )
                })}
            </div>

            {templateSwitchingConfirmatiom && (<div className=" z-50 fixed inset-0 bg-black/70 flex-center w-full h-full">
                {/* Template switch confirmation modal */}

                <div className=" bg-white p-6 rounded-md shadow-md w-[500px]   ">
                    <h3 className=" text-lg font-semibold mb-4">Confirm Template Change</h3>
                    <p className="mb-6">
                        Are you sure you want to switch to the
                        <span className="font-medium capitalize  mr-1"> {selectedTemplateKeyForSwitching}</span>
                        with the
                        <span className="font-medium capitalize mr-1"> {selectedLayoutTheme}</span>
                        theme?
                    </p>

                    <div className=" flex justify-end space-x-4">
                        <button
                            onClick={confirmTemplateChange}
                            className=" px-4 py-1.5 cursor-pointer text-white bg-[#099613] rounded-md"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => {
                                setTemplateSwitchingConfirmatiom(false)
                                setselectedTemplateKeyForSwitching(null)
                            }
                            }
                            className=" px-4 py-1.5 cursor-pointer bg-gray-300 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>


                </div>

            </div>)}

        </div>

    )
}
