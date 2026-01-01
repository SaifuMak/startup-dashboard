'use client'
import { useState } from 'react'
import { RiArrowDropDownFill } from "react-icons/ri"
import useClickOutside from '@/app/hooks/useClickOutside'

function FontSizeDropdown({
    value,
    options = [],
    onChange
}) {
    const [open, setOpen] = useState(false)

    const ref = useClickOutside(() => {
        setOpen(false)
    })

    return (
        <div ref={ref} className="relative w-16 text-sm">
            {/* Button */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full px-3 py-2 border border-[#C7BFFF] rounded-md bg-white flex items-center justify-between"
            >
                <span>
                    {value ? value?.toUpperCase() : 'Select size'}
                </span>

                <RiArrowDropDownFill
                    className={`text-xl transition-transform duration-300 ${open ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`
                    absolute z-50 mt-1 w-full bg-white text-sm border border-[#C7BFFF]
                    rounded-md shadow-md overflow-hidden
                    transition-all duration-300 ease-out
                    ${open
                        ? 'max-h-[200px] opacity-100 translate-y-0'
                        : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none'
                    }
                   `}
            >
                {options.map(size => (
                    <div
                        key={size}
                        onClick={() => {
                            onChange?.(size)
                            setOpen(false)
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-[#F2F0FF]"
                    >
                        {size?.toUpperCase()}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default FontSizeDropdown
