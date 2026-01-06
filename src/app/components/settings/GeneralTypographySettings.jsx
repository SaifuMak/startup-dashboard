
'use client'
import { useState, useEffect } from 'react'
import TypographyRow from './Componets/typography/TypographyRow';
import { updateSiteTypography } from '@/app/actions/websites';
import UnsavedChangesBar from './UnsavedChangesBar';
import { toast } from "sonner"


function GeneralTypographySettings({ data, updateLocalData, setIsLoading, isLoading, typographyFields, isTypographyChanged, setIsTypographyChanged }) {

  const [localTypographySettings, setLocalTypographySettings] = useState(null);

  useEffect(() => {
    console.log(data?.typography_settings)
    if (data?.typography_settings) {
      setLocalTypographySettings(data.typography_settings);
    }
  }, [data]);


  const handleTypographyChange = (sectionKey, fieldKey, value) => {
    setLocalTypographySettings(prev => {
      const updated = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [fieldKey]: value,
        },
      }

      return updated
    })
    setIsTypographyChanged(true)
  }

  //  update parent
  useEffect(() => {
    if (!localTypographySettings) return

    updateLocalData({ typography_settings: localTypographySettings })
  }, [localTypographySettings])



  const handleSaveTypography = async () => {
    if (!localTypographySettings || !isTypographyChanged) return

    try {
      setIsLoading(true)
      const res = await updateSiteTypography(
        data.primary_domain,
        localTypographySettings
      )

      if (res.success) {
        toast.success("Changes saved successfully")
        setIsTypographyChanged(false)
      } else {
        toast.error(" Failed to save changes")
      }
    } catch (err) {
      toast.error("Something went wrong, Please try again")
    }
    finally {
      setIsLoading(false)
    }
  }

  console.log(localTypographySettings, 'this is the typographies')

  if (!localTypographySettings) return null;

  return (
    <div className="w-full">
      <UnsavedChangesBar
        show={isTypographyChanged}
        bottom
        onSave={handleSaveTypography}
      />

      {/* Table Rows */}
      <div className="space-y-4">
        {typographyFields.map(field => (
          <TypographyRow
            key={field.key}
            sectionKey={field.key}
            label={field.label}
            description={field.description}
            type={field.type}
            value={localTypographySettings[field.key]}
            primaryFont={localTypographySettings.primary_font}
            secondaryFont={localTypographySettings.secondary_font}
            onChange={handleTypographyChange}
          />
        ))}
      </div>
      <UnsavedChangesBar
        show={isTypographyChanged}
        top
        onSave={handleSaveTypography}
      />

    </div>
  )

}

export default GeneralTypographySettings