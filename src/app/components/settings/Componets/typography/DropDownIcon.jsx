import React from 'react'
import { BiSolidDownArrow } from "react-icons/bi";

function DropDownIcon({open}) {
  return (
       <BiSolidDownArrow size={11}
          className={` transition-transform duration-300 text-admin-violet  ${open ? 'rotate-180' : ''
            }`}
        />
  )
}

export default DropDownIcon