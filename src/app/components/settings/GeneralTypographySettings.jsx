
'use client'
import { useState, useEffect } from 'react'
import TypographyRow from './Componets/typography/TypographyRow';

function GeneralTypographySettings({ data, updateLocalData, setIsLoading, isLoading, typographyFields }) {

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
  }

  //  update parent
  useEffect(() => {
    if (!localTypographySettings) return
    console.log(localTypographySettings)
    updateLocalData({
      typography_settings: localTypographySettings,
    })
  }, [localTypographySettings])

  if (!localTypographySettings) return null;




  return (
    <div className="w-full">

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
    </div>
  )

}

export default GeneralTypographySettings