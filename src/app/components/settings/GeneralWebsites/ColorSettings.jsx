'use client'
import { useState, useEffect } from "react"
import ColorThemeRow from "../Componets/ColorThemeRow"
import { updateSiteColors } from "@/app/actions/websites"
import { toast } from "sonner"

function ColorSettings({ data, updateLocalData }) {

    //  the key is the color variables from the db 
    const THEME_FIELDS = [
        { key: "primary", label: "Primary", description: "Used for buttons, icons etc" },
        { key: "btn_text", label: "Button Text", description: "Color for button content" },
        { key: "header_bg", label: "Header Background", description: "Choose your header background" },
        { key: "header_text", label: "Header Content", description: "All text content on header" },
        { key: "hero_text", label: "Hero Text", description: "Used for button text" },
        { key: "section_bg", label: "Primary Section Background", description: "Background color for sections" },
        { key: "section_text", label: "Primary Section Text", description: "Primary content color" },
        { key: "alt_section_bg", label: "Alternate Section Background", description: "Background color for sections" },
        { key: "alt_section_text", label: "Alternate Section Text", description: "Primary content color" },
        { key: "heading", label: "Headings", description: "All section headings" },
        { key: "footer_bg", label: "Footer Background", description: "Background color for footer" },
        { key: "footer_text", label: "Footer Text", description: "Content color of footer" }
    ]

    const [colors, setColors] = useState(null)
    const [isColorChanged, setIsColorChanged] = useState(false)


    // normalize the color code to upercase
    const normalizeHex = (hex) => hex.toUpperCase()


    useEffect(() => {
        if (data?.color_settings) {
            setColors(data.color_settings)
        }
    }, [data])

    const handleColorChange = (theme, fieldKey, color) => {
        const normalizedColor = normalizeHex(color)

        setColors(prev => {
            //  bail out if no actual change, this prevents the continous call when color is dragged 
            if (prev?.[theme]?.[fieldKey] === normalizedColor) {
                return prev
            }
            setIsColorChanged(true)

            return {
                ...prev,
                [theme]: {
                    ...prev[theme],
                    [fieldKey]: normalizedColor
                }
            }
        })
    }


    useEffect(() => {
        if (!colors) return
        updateLocalData({ color_settings: colors })
    }, [colors])


    useEffect(() => {
        if (!isColorChanged || !colors) return

        const timer = setTimeout(async () => {
            try {
                const res = await updateSiteColors(
                    data.primary_domain,
                    colors
                )

                if (res.success) {
                    toast.success(" Colors saved successfully")
                    setIsColorChanged(false)
                } else {
                    toast.success(" Failed to save colors")
                }
            } catch (err) {
                toast.success("Something went wrong, Please try again")
            }
        }, 800)

        return () => clearInterval(timer)

    }, [isColorChanged, colors])

    if (!colors) return null

    return (
        <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 border-b pb-3 mb-4 font-semibold text-lg">
                <div>Color</div>
                <div className="text-center">Light</div>
                <div className="text-center">Dark</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
                {THEME_FIELDS.map(field => (
                    <ColorThemeRow
                        key={field.key}
                        label={field.label}
                        description={field.description}
                        fieldKey={field.key}
                        lightColor={colors.light[field.key]}
                        darkColor={colors.dark[field.key]}
                        onChange={handleColorChange}
                    />
                ))}
            </div>
        </div>
    )
}

export default ColorSettings
