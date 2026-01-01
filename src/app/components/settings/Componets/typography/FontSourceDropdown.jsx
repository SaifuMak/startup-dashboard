'use client'
import { useState } from 'react'
import { RiArrowDropDownFill } from "react-icons/ri"
import useClickOutside from '@/app/hooks/useClickOutside'
import DropDownIcon from './DropDownIcon'

function FontSourceDropdown({
  value,
  options = [],
  onChange
}) {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside(() => setOpen(false))

  return (
    <div ref={ref} className="relative w-40 mr-3 text-sm">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full px-3 py-2 border border-admin-violet-border rounded-md bg-white flex items-center justify-between capitalize"
      >
        <span>{value}</span>
        <DropDownIcon open={open} />

      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute z-50 mt-1 w-full bg-white border border-admin-violet-border
          rounded-md shadow-md overflow-hidden
          transition-all duration-300 ease-out transform
          ${open
            ? 'max-h-40 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none'
          }
        `}
      >
        {/* INNER WRAPPER (important) */}
        <div className="flex flex-col">
          {options.map(option => (
            <div
              key={option}
              onClick={() => {
                onChange?.(option)
                setOpen(false)
              }}
              className="px-3 py-2 cursor-pointer hover:bg-[#F2F0FF] capitalize"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FontSourceDropdown
