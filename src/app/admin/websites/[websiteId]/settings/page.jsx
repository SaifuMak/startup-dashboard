import LoaderIcon from "@/app/components/general-components/LoaderIcon"
import NavBar from "@/app/admin/components/NavBar"
import SideBar from "@/app/admin/components/SideBar"
import { SlGlobe } from "react-icons/sl";
import CommingSoonSettings from "@/app/components/settings/CommingSoonSettings";

export default async function Settings({ params }) {

    const { websiteId } = await params;

    return (
        <div className=" flex ">
            <SideBar />
            <div className=" w-full  min-h-screen flex flex-col  bg-admin-light-background ">
                <NavBar />


                <div className="w-10/12 p-8 xl:p-10 2xl:p-16">

                    <div className=" flex   items-center justify-between mb-8 ">

                        <div className="flex  items-center space-x-5  ">
                            <h1 className=" text-[22px] font-semibold ">Settings</h1>
                            <div className=" flex items-center text-[#6E6E6E]  space-x-2 mt-1 xl:space-x-2">

                                <SlGlobe className='xl:text-lg' />
                                <p className=" text-admin-grey-600  xl:text-lg ">{websiteId}</p>
                            </div>
                        </div>

                        <button className=" px-8 py-1.5 bg-admin-violet text-sm font-medium text-white rounded-xl">GO BACK</button>
                    </div>

                    <CommingSoonSettings data={null}/>

                </div>

            </div>

        </div>
    )
}