'use client'
import { ChromePicker } from "react-color";
import { useState } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";

export default function ColorThemePicker({ label, color, setColor }) {

    const [isPickerVisible, setIsPickerVisible] = useState(false)
    const pickerRef = useClickOutside(() => setIsPickerVisible(false))

    return (
        <div className={`flex items-center gap-3 `}>
            {label && (
                <span className="text-sm text-gray-600 md:w-10">{label}</span>
            )}

            <div className="relative  ">

                <div onClick={() => setIsPickerVisible(v => !v)} className=" w-full flex  cursor-pointer items-center space-x-4 lg:space-x-6">
                    <div    className="rounded-full  border-1 border-slate-400 p-[2px]">
                        <div

                            className="md:size-6  size-5 rounded-full "
                            style={{ backgroundColor: color }}
                        />
                    </div>
                    <div className=" bg-[#FBF9FF] border w-[80px] flex-center rounded-md py-1.5 border-admin-violet-border ">
                        <span className=" text-xs md:text-sm">{color}</span>
                    </div>

                </div>

                {isPickerVisible && (
                    <div ref={pickerRef} className="absolute z-20 mt-2">
                        <ChromePicker
                            color={color}
                            onChangeComplete={(c) => setColor(c.hex)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
