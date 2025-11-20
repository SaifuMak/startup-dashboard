import React from 'react'
import SideBar from '../components/SideBar'

function page() {
    return (
        <div className=" flex ">
            <SideBar />
            <div className=" w-full h-screen flex-center">
                <p className=" text-3xl"> Websites</p>
            </div>
        </div>
    )
}

export default page