import React from 'react'
import Image from 'next/image'
import { SlGlobe } from "react-icons/sl";
import { FiCheck } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { LiaEdit } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';

function WebsiteListingCard({ data = [] }) {
    return (
        <div className="">
            {data?.map((obj, ind) => (
                <div key={ind} className="my-6  px-4 lg:px-8 py-6 rounded-xl border border-[#EEEEEE] md:space-x-7 xl:space-x-16  flex max-md:flex-col  bg-white">
                    <div className=" 2xl:w-[420px] xl:w-[400px] md:w-[320px] bg-slate-200 2xl:h-[250px] xl:h-[220px] lg:h-[200px] sm:h-[240px] h-[180px] relative">
                        <Image src={ obj?.preview_image_url ? obj.preview_image_url : '/image/demo.png'} alt={obj.primary_domain} fill className=' w-full h-full  ' />
                    </div>

                    <div className="  mt-5 space-y-6  xl:space-y-9 ">
                        <div className=" flex   w-full   justify-between">
                            <div className=" flex  space-x-2 xl:space-x-4">

                                <SlGlobe className='xl:text-xl mt-2 ' />
                                <div className="">
                                    <p className=" xl:text-xl text-lg ">{obj.primary_domain}</p>
                                    <p className=" text-[#919191] max-xl:text-sm">{obj.label}</p>

                                    <div className={`border md:hidden w-fit mt-2 lg:ml-3 ${obj.status === 'active' ? 'bg-[#1AD5981A] text-[#1AD598] border-[#1AD59866]' : 'bg-[#99B2C61A] text-light-secondary border-[#99B2C666]'}  text-[11px]  space-x-1  px-2 h-fit py-0.5 flex justify-center items-center  rounded-full `}>
                                        <span className="">{obj.status === 'active' ? <FiCheck size={12} /> : <GoDotFill size={12} />}</span>
                                        <p className="">{obj.status === 'active' ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`border max-md:hidden w-fit mt-1 lg:ml-3 ${obj.status === 'active' ? 'bg-[#1AD5981A] text-[#1AD598] border-[#1AD59866]' : 'bg-[#99B2C61A] text-light-secondary border-[#99B2C666]'}  text-xs  space-x-2  px-2 h-fit py-1 flex justify-center items-center  rounded-full `}>
                                <span className="">{obj.status === 'active' ? <FiCheck size={15} /> : <GoDotFill />}</span>
                                <p className="">{obj.status === 'active' ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>


                        <div className=" mt-4 text-sm flex max-xl:flex-col max-xl:space-y-2 xl:space-x-8  2xl:space-x-12 ">
                            <div className=" flex   space-x-2">
                                <FiCalendar size={16} />
                                <p className="">Started</p>
                                <p className=" text-[#7E7E7E]">{obj.created_at}</p>
                            </div>
                            <div className=" flex space-x-2">
                                <FiCalendar size={16} />
                                <p className="">Renews</p>
                                <p className=" text-[#7E7E7E]">{obj.renewal_date_formatted}</p>
                            </div>
                        </div>

                        <div className=" mt-7 text-sm flex space-x-6  text-[#17181A]">
                            <Link href={`/admin/websites/${obj.primary_domain}/settings`} className="border  flex items-center space-x-1 rounded-md max-lg:text-sm cursor-pointer px-2 py-0.5 border-[#B7B7B7]"><CiSettings size={18} /> <span className=" font-medium">Settings</span></Link>
                            <button className="border flex items-center space-x-1 rounded-md px-2 cursor-pointer py-0.5 border-[#B7B7B7]"><LiaEdit size={18} /> <span className=" font-medium">Edit Content</span></button>

                        </div>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default WebsiteListingCard