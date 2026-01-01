
'use client'
import { useState, useEffect } from 'react'
import { AVAILABLE_FONTS } from '@/app/data/Typography';
import TypographyRow from './Componets/typography/TypographyRow';

function GeneralTypographySettings({ data, updateLocalData, setIsLoading, isLoading, typographyFields }) {

  const [localTypographySettings, setLocalTypographySettings] = useState(null);

  useEffect(() => {
    console.log(data?.typography_settings)
    if (data?.typography_settings) {
      setLocalTypographySettings(data.typography_settings);
    }
  }, [data]);

  if (!localTypographySettings) return null;


  const handleColorChange = (fieldKey, field, value) => {
  }

  return (
    <div className="w-full">

      {/* Table Rows */}
      <div className="space-y-4">
        {typographyFields.map(field => (
          <TypographyRow
            key={field.key}
            label={field.label}
            description={field.description}
            type={field.type}
            value={localTypographySettings[field.key]}
            onChange={handleColorChange}
          />
        ))}
      </div>
    </div>
  )

}

export default GeneralTypographySettings