'use client'
import { useState } from 'react'
import { RiArrowDropDownFill } from "react-icons/ri"
import useClickOutside from '@/app/hooks/useClickOutside'
import DropDownIcon from './DropDownIcon'

function LineHeightDropdown({
    value,
    options = [],
    onChange
}) {
    const [open, setOpen] = useState(false)

    const ref = useClickOutside(() => {
        setOpen(false)
    })

    return (
        <div ref={ref} className="relative min-w-22 text-sm">
            {/* Button */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full px-3 py-2 border border-admin-violet-border rounded-md bg-admin-violet/5 flex items-center justify-between"
            >
                <img src="/image/line-height.svg" alt="" className="size-6 object-contain " />

                <span className='mr-2'>
                    {`${value} em` || 'Select line height'}
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
                {options.map(lineHeight => (
                    <div
                        key={lineHeight}
                        onClick={() => {
                            onChange?.(lineHeight)
                            setOpen(false)
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-[#F2F0FF]"
                    >
                        {`${lineHeight} em`}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LineHeightDropdown
