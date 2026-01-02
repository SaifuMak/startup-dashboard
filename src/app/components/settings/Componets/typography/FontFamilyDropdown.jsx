'use client'
import { useState } from 'react'
import useClickOutside from '@/app/hooks/useClickOutside'
import DropDownIcon from './DropDownIcon'

function FontFamilyDropdown({
    value,
    options = [],
    searchable = false,
    onChange
}) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const ref = useClickOutside(() => {
        setOpen(false)
        setQuery('')
    })

    const filteredOptions = options.filter(font =>
        font.toLowerCase().startsWith(query.toLowerCase())
    )


    return (
        <div ref={ref} className="relative w-full lg:w-36 h-fit xl:w-48 text-sm  ">
            {/* Button */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="w-full px-3 py-2 border  border-admin-violet-border rounded-md bg-white flex items-center justify-between"
            >
                <span style={{ fontFamily: value }} >
                    {value || 'Select font'}
                </span>
                <DropDownIcon open={open} />

            </button>

            {/* Dropdown */}

            <div
                className={`
                    absolute z-50 mt-1 w-full bg-white text-sm border  rounded-md   border-admin-violet-border
                  shadow-md  overflow-y-auto
                    transition-all duration-300 ease-out
                    ${open
                        ? 'max-h-[200px] opacity-100 translate-y-0'
                        : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none'
                    }
                `}
            >
                {searchable && (
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search font..."
                        className="w-full px-3 sticky top-0 bg-white py-2 border-b border-[#C7BFFF] outline-none text-sm"
                    />
                )}

                {filteredOptions.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-500">
                        No fonts found
                    </div>
                )}

                {filteredOptions.map(font => (
                    <div
                        key={font}
                        onClick={() => {
                            if (value !== font) { onChange?.(font) }
                            setOpen(false)
                            setQuery('')
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-[#F2F0FF]`}
                        style={{ fontFamily: font }}
                    >
                        {font}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FontFamilyDropdown
