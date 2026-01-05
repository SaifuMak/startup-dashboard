import React from 'react'
import FontFamilyDropdown from './FontFamilyDropdown'
import FontSourceDropdown from './FontSourceDropdown'
import { AVAILABLE_FONTS } from '@/app/data/Typography'
import FontWeightDropdown from './FontWeightDropdown'
import LineHeightDropdown from './LineHeightDropdown'
import FontSizeInput from './FontSizeInput'

function TypographyRow({
    sectionKey,
    label,
    description,
    type,
    value,
    primaryFont,
    secondaryFont,
    onChange
}) {

    return (
        <div className="grid md:grid-cols-3 gap-6  xl:gap-12   border-b border-[#DDDDDD]  pb-5 md:mb-7 lg:mb-12 ">
            {/* Name */}
            <div>
                <div className="font-medium ">{label}</div>
                <div className="text-sm md:mt-1  text-[#7D7878]">{description}</div>
            </div>

            <div className="grid col-span-2  ">
                {type === 'font_family' ? (
                    <FontFamilyDropdown
                        value={value?.font_family}
                        options={AVAILABLE_FONTS}
                        searchable
                        onChange={(val) => onChange(sectionKey, "font_family", val)}
                    />
                ) : (
                    <div className=" flex flex-col  gap-5">
                        <div className=" space-y-5">
                            <FontSourceDropdown
                                value={value?.font_source}
                                displayFontFamily={
                                    value?.font_source === 'primary' ? `${primaryFont?.font_family}`
                                        : value?.font_source === "secondary" ? `${secondaryFont?.font_family}` : null
                                }
                                options={["primary", "secondary", "custom"]}
                                onChange={(val) => onChange(sectionKey, "font_source", val)}
                            />
                            {value?.font_source === "custom" && (
                                <FontFamilyDropdown
                                    value={value.font_family}
                                    options={AVAILABLE_FONTS}
                                    searchable
                                    onChange={(val) => onChange(sectionKey, "font_family", val)}
                                />
                            )}
                        </div>

                        <div className="flex max-lg:flex-col max-lg:space-y-5 lg:space-x-7 ">

                            <FontWeightDropdown
                                value={value?.font_weight}
                                options={['light', 'regular', 'semibold', 'bold']}
                                onChange={(val) => onChange(sectionKey, "font_weight", val)}
                            />

                            <FontSizeInput
                                value={value?.font_size}
                                
                                onChange={(val) =>
                                    onChange(sectionKey, 'font_size', val)
                                }
                            />

                            <LineHeightDropdown
                                value={value?.line_height}
                                options={['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.8', '2']}
                                onChange={(val) => onChange(sectionKey, "line_height", val)} />
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default TypographyRow