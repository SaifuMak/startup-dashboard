import React from 'react'
import FontFamilyDropdown from './FontFamilyDropdown'
import FontSourceDropdown from './FontSourceDropdown'
import { AVAILABLE_FONTS } from '@/app/data/Typography'
import FontWeightDropdown from './FontWeightDropdown'
import FontSizeDropdown from './FontSizeDropdown'
import LineHeightDropdown from './LineHeightDropdown'

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

            <div className="flex ">
                {type === 'font_family' ? (
                    <FontFamilyDropdown
                        value={value.font_family}
                        options={AVAILABLE_FONTS}
                        searchable
                    // onChange={(font) => onChange("font_family", font)}
                    />
                ) : (
                    <div className=" flex flex-col  gap-5">
                        <div className="">
                            <FontSourceDropdown
                                value={value.font_source}
                                options={["primary", "secondary", "custom"]}
                            // onChange={(source) => onChange("font_source", source)}
                            />
                        </div>
                        <div className="  flex space-x-7 ">
                            {value.font_source === "custom" && (
                                <FontFamilyDropdown
                                    value={value.font_family}
                                    options={AVAILABLE_FONTS}
                                    searchable
                                // onChange={(font) => onChange("font_family", font)}
                                />
                            )}
                            <FontWeightDropdown
                                value={value.font_weight}
                                options={['light', 'regular', 'semibold', 'bold']}
                            />

                            <FontSizeDropdown
                                value={value.text_transform}
                                options={['s', 'm', 'l']}
                            />
                            <LineHeightDropdown
                                value={value.line_height}
                                options={['1', '1.2', '1.4', '1.6', '1.8']} />
                        </div>
                    </div>
                )}

            </div>

        </div>
    )
}

export default TypographyRow