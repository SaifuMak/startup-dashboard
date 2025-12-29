import React from "react"
import ColorThemePicker from "./ColorThemePicker"

export default function ColorThemeRow({
  label,
  description,
  fieldKey,
  lightColor,
  darkColor,
  onChange
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6  md:gap-4  items-center border-b border-[#DDDDDD] pb-5 md:mb-7 lg:mb-12">
      {/* Name */}
      <div>
        <div className="font-medium ">{label}</div>
        <div className="text-sm md:mt-1  text-[#7D7878]">{description}</div>
      </div>

      {/* Light */}
      <div className="flex md:justify-center">
        <ColorThemePicker
          color={lightColor}
          setColor={(val) => onChange("light", fieldKey, val)}
        />
        <p className=" md:hidden ml-4 text-sm my-auto">For Light Layout</p>

      </div>

      {/* Dark */}
      <div className="flex md:justify-center">
        <ColorThemePicker
          color={darkColor}
          setColor={(val) => onChange("dark", fieldKey, val)}
        />
        <p className=" md:hidden ml-4 text-sm my-auto">For Dark Layout</p>

      </div>
    </div>
  )
}
