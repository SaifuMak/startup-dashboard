'use client'
import { useState, useEffect } from "react"
import ColorThemeRow from "./Componets/ColorThemeRow"
import { updateSiteColors } from "@/app/actions/websites"
import { toast } from "sonner"
import UnsavedChangesBar from "./UnsavedChangesBar"

function GeneralColorSettings({ data, updateLocalData, setIsLoading, colorThemes, isColorChanged, setIsColorChanged }) {

    const [colors, setColors] = useState(null)

    // normalize the color code to upercase
    const normalizeHex = (hex) => hex.toUpperCase()

    useEffect(() => {
        if (data?.color_settings) {
            setColors(data.color_settings)
        }
    }, [data])


    // callback when the color is changed
    const handleColorChange = (theme, fieldKey, color) => {
        const normalizedColor = normalizeHex(color)
        let changed = false

        setColors(prev => {
            //  bail out if no actual change, this prevents the continous call when color is dragged 
            if (prev?.[theme]?.[fieldKey] === normalizedColor) {
                return prev
            }

            changed = true

            return {
                ...prev,
                [theme]: {
                    ...prev[theme],
                    [fieldKey]: normalizedColor
                }
            }

        })
        if (changed) {
            setIsColorChanged(true)
        }
    }

    useEffect(() => {
        if (!colors) return
        updateLocalData({ color_settings: colors })
    }, [colors])


    // this calls to backend to update the colors  
    const handleSaveColors = async () => {
        if (!colors || !isColorChanged) return

        try {
            setIsLoading(true)
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
            // if the api fails revert the change
            // setColors(lastSavedColors);
            // updateLocalData({ color_settings: lastSavedColors });
            setIsColorChanged(false);
            toast.success("Something went wrong, Please try again")
        }
        finally {
            setIsLoading(false)
        }
    }

    if (!colors) return null

    return (
        <div className="w-full ">
            <UnsavedChangesBar
                show={isColorChanged}
                bottom
                onSave={handleSaveColors}
            />
            {/* Table Header */}
            <div className="grid grid-cols-3 max-md:hidden gap-4 border-b border-slate-200 pb-3 mb-10 font-semibold ">
                <div></div>
                <div className="text-center">For Light Layout</div>
                <div className="text-center">For Dark Layout</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
                {colorThemes.map(field => (
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
            <UnsavedChangesBar
                show={isColorChanged}
                bottom
                onSave={handleSaveColors}
            />
        </div>
    )
}

export default GeneralColorSettings
