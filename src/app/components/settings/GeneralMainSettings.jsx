'use client'
import { updateSiteStatus } from "@/app/actions/websites";
import { toast } from "sonner";
import { useState } from "react";

export const SettingsRow = ({ title, description, descriptionStyle = '', isBottomBorder = true, children }) => {

  const h2TagStyles = " text-xl font-medium ";
  const pTagStyles = " text-[#7D7878] mt-1 ";

  return (
    <div className={` flex  space-x-20 mb-16 pb-8 ${isBottomBorder ? 'border-b border-[#DDDDDD]' : ''} `}>
      <div className=" w-[300px] ">
        <h2 className={h2TagStyles}>{title}</h2>
        <p className={`${pTagStyles} ${descriptionStyle}`}>{description}</p>
      </div>
      {children}
    </div>
  )
}

  // this is the full data object passed as prop
function GeneralMainSettings({ data }) {

  const [settingsData, setSettingsData] = useState(data.settings);

  // handle status change
  const handleStatusChange = async (WebsiteStatus) => {

    toast.dismiss()
    if (settingsData?.website_status === WebsiteStatus) return; // no change
    const { success } = await updateSiteStatus(data.primary_domain, WebsiteStatus)

    if (success) {
      setSettingsData((prev) => ({ ...prev, website_status: WebsiteStatus }))
      toast.success('Status updated successfully')
    }
    else {
      toast.error('Failed to update status')
    }
  }



  return (
    <>

      <SettingsRow title="Status" description="Publish or unpublish your site">
        {/*  status selection */}
        <div className=" flex items-center  space-x-10">
          <div onClick={() => handleStatusChange(true)} className=" cursor-pointer  border px-7 py-1 rounded-sm  border-admin-violet-border flex items-center  space-x-2">
            <div className={`${settingsData?.website_status ? ' bg-admin-violet' : 'border border-[#7453EC]'} size-3 rounded-full`} ></div>
            <p className="">Active</p>
          </div>
          <div onClick={() => handleStatusChange(false)} className=" cursor-pointer  border px-7 py-1 rounded-sm border-admin-violet-border flex items-center space-x-2">
            <div className={`${!settingsData?.website_status ? ' bg-admin-violet' : ' border border-[#7453EC] bg-slate-50'} size-3 rounded-full`} ></div>
            <p className="">Offline</p>
          </div>
        </div>
      </SettingsRow>

      <SettingsRow title="Domain" description="Connect a domain to your website">
        {/* site title input */}
        <div className=" ">
          <div className=" border border-admin-violet-border rounded-sm  py-1 px-4 text-[#434242] ">{data?.primary_domain}</div>
          <div className=" flex items-center space-x-2 mt-1 ml-3">
            <span className=" size-2.5 mt-0.5 bg-green-500 rounded-full " />
            <p className="">Domain connected and activated</p>
          </div>
        </div>
      </SettingsRow>

      <SettingsRow title="Logo" description="Upload PNG or SVG for better quality">

        <div className="">

          <div className="  border border-admin-violet-border flex-center  h-[100px] w-[300px] relative rounded-sm">
            <p className=" text-[#A3A3A3] text-sm">No logo uploaded </p>
          </div>
          <button className=" bg-admin-violet px-5 cursor-pointer py-1 mt-3 text-xs rounded-md text-white">UPLOAD</button>
        </div>

      </SettingsRow>

      <SettingsRow title="Favicon" description="Upload your website’s icon.
          PNG or SVG (512*512px)" descriptionStyle=' w-[200px]' isBottomBorder={false}>

        <div className="">
          <div className="  border border-admin-violet-border flex-center  h-[100px] w-[100px] relative rounded-sm">
            <p className=" text-[#A3A3A3] text-sm">No Favicon </p>
          </div>
          <button className=" bg-admin-violet px-5 cursor-pointer py-1 mt-3  text-xs rounded-md text-white">UPLOAD</button>
        </div>

      </SettingsRow>

    </>


  )
}

export default GeneralMainSettings