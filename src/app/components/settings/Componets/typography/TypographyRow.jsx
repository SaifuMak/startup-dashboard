import React from 'react'
import FontFamilyDropdown from './FontFamilyDropdown'
import FontSourceDropdown from './FontSourceDropdown'
import { AVAILABLE_FONTS } from '@/app/data/Typography'

function TypographyRow({
    label,
    description,
    type,
    value,
    onChange
}) {
    return (
        <div className="grid md:grid-cols-2 gap-6  md:gap-4  items-center border-b border-[#DDDDDD] pb-5 md:mb-7 lg:mb-12">
            {/* Name */}
            <div>
                <div className="font-medium ">{label}</div>
                <div className="text-sm md:mt-1  text-[#7D7878]">{description}</div>
            </div>

            <div className="flex md:justify-center">
                {type === 'font_family' ? (
                    <FontFamilyDropdown
                        value={value.font_family}
                        options={AVAILABLE_FONTS}
                        searchable
                    // onChange={(font) => onChange("font_family", font)}
                    />
                ) : (
                    <>
                        <FontSourceDropdown
                            value={value.font_source}
                            options={["primary", "secondary", "custom"]}
                        // onChange={(source) => onChange("font_source", source)}
                        />

                        {value.font_source === "custom" && (
                            <FontFamilyDropdown
                                value={value.font_family}
                                options={AVAILABLE_FONTS}
                                searchable
                            // onChange={(font) => onChange("font_family", font)}
                            />
                        )}</>
                )}

            </div>

        </div>
    )
}

export default TypographyRow