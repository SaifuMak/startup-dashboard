'use client'
import { useState } from 'react'
import { RiArrowDropDownFill } from "react-icons/ri"
import useClickOutside from '@/app/hooks/useClickOutside'
import { FONT_WEIGHT_MAP, FONT_WEIGHT_LABELS } from '@/app/data/fontWeightRegistry'
import DropDownIcon from './DropDownIcon'


function FontWeightDropdown({
    value,
    options = [],
    onChange
}) {
    const [open, setOpen] = useState(false)

    const ref = useClickOutside(() => {
        setOpen(false)
    })

    return (
        <div ref={ref} className="relative lg:w-36 h-fit xl:w-48 text-sm">
            {/* Button */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full px-3 py-2 border border-admin-violet-border rounded-md  bg-admin-violet/5 flex items-center justify-between"
            >
                <span className={value ? FONT_WEIGHT_MAP[value] : ''}>
                    {value ? FONT_WEIGHT_LABELS[value] : 'Select weight'}
                </span>

                <DropDownIcon open={open} />

            </button>

            {/* Dropdown */}
            <div
                className={`
          absolute z-50 mt-1 w-full bg-white text-sm border border-admin-violet-border
          rounded-md shadow-md overflow-hidden
          transition-all duration-300 ease-out
            ${open
                        ? 'max-h-[200px] opacity-100 translate-y-0'
                        : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none'
                    }
        `}
            >
                {options.map(weight => (
                    <div
                        key={weight}
                        onClick={() => {
                             if (value !== weight){ onChange?.(weight)}
                            setOpen(false)
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-[#F2F0FF] ${FONT_WEIGHT_MAP[weight]}`}
                    >
                        {FONT_WEIGHT_LABELS[weight]}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FontWeightDropdown
