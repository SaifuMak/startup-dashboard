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
                <span className="text-sm text-gray-600 w-10">{label}</span>
            )}

            <div className="relative  ">

                <div className=" w-full flex items-center space-x-6">
                    <div  onClick={() => setIsPickerVisible(v => !v)}  className="rounded-full  cursor-pointer border-1 border-slate-400 p-[3px]">
                        <div

                            className="size-7 rounded-full "
                            style={{ backgroundColor: color }}
                        />
                    </div>
                    <div className=" bg-[#FBF9FF] border w-[100px] flex-center rounded-md py-1.5 border-admin-violet-border ">
                        <span className="">{color}</span>
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
