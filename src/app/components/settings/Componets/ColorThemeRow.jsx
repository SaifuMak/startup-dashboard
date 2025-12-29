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
    <div className="grid grid-cols-3 gap-4 items-center border-b pb-4">
      {/* Name */}
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>

      {/* Light */}
      <div className="flex justify-center">
        <ColorThemePicker
          color={lightColor}
          setColor={(val) => onChange("light", fieldKey, val)}
        />
      </div>

      {/* Dark */}
      <div className="flex justify-center">
        <ColorThemePicker
          color={darkColor}
          setColor={(val) => onChange("dark", fieldKey, val)}
        />
      </div>
    </div>
  )
}
