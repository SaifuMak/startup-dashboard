import React from 'react'
import Image from 'next/image'
import { SlGlobe } from "react-icons/sl";
import { FiCheck } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { LiaEdit } from "react-icons/lia";
import { GoDotFill } from "react-icons/go";

function WebsiteListingCard({ data = [], name }) {
    return (
        <div className="">
            {data?.map((obj, ind) => (
                <div key={ind} className="my-6 px-8 py-6 rounded-xl border border-[#EEEEEE] space-x-16  flex  bg-white">
                    <div className=" w-[420px] bg-slate-200 h-[250px] relative">
                        <Image src='/image/demo.png' alt={obj.primary_domain} fill className=' w-full h-full ' />
                    </div>

                    <div className="   mt-5 space-y-9 ">
                        <div className=" flex  w-full   justify-between">
                            <div className=" flex  space-x-4">

                                <SlGlobe className='text-xl mt-2' />
                                <div className="">
                                    <p className=" text-xl ">{obj.primary_domain}</p>
                                    <p className=" text-[#919191]">{name}</p>
                                </div>
                            </div>

                            <div className={`border mt-1 ml-3 ${obj.status === 'active' ? 'bg-[#1AD5981A] text-[#1AD598] border-[#1AD59866]' : 'bg-[#99B2C61A] text-light-secondary border-[#99B2C666]'}  text-xs  space-x-2  px-2 h-fit py-1 flex-center  rounded-full `}>
                                <span className="">{obj.status === 'active' ?  <FiCheck size={15} /> : <GoDotFill/>}</span>
                                <p className="">{obj.status === 'active' ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>


                        <div className=" mt-4  text-sm flex  space-x-12 ">
                            <div className=" flex  items-center space-x-2">
                                <FiCalendar size={16} />
                                <p className="">Started</p>
                                <p className=" text-[#7E7E7E]">{obj.created_at}</p>
                            </div>
                            <div className=" flex  items-center space-x-2">
                                <FiCalendar size={16} />
                                <p className="">Renews</p>
                                <p className=" text-[#7E7E7E]">{obj.renewal_date_formatted}</p>
                            </div>
                        </div>

                        <div className=" mt-7 text-sm flex space-x-6  text-[#17181A]">
                            <button className="border  flex items-center space-x-1 rounded-md cursor-pointer px-2 py-0.5 border-[#B7B7B7]"><CiSettings size={18} /> <span className=" font-medium">Settings</span></button>
                            <button className="border flex items-center space-x-1 rounded-md px-2 cursor-pointer py-0.5 border-[#B7B7B7]"><LiaEdit size={18} /> <span className=" font-medium">Edit Content</span></button>

                        </div>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default WebsiteListingCard