'use client'

import { useMemo, useState } from 'react'
import { getCitiesByProvince, provinces } from '@/lib/location/catalonia'
import { Label } from '@/components/ui/label'

type LocationSelectsProps = {
  defaultProvince?: string | null
  defaultCity?: string | null
  labels: {
    province: string
    city: string
    selectProvince: string
    selectCity: string
    provinceRequired: string
  }
}

export function LocationSelects({
  defaultProvince,
  defaultCity,
  labels,
}: LocationSelectsProps) {
  const [province, setProvince] = useState(defaultProvince ?? '')
  const [warning, setWarning] = useState<string | null>(null)
  const cities = useMemo(() => getCitiesByProvince(province), [province])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="province">{labels.province}</Label>
        <select
          id="province"
          name="province"
          value={province}
          onChange={(event) => {
            setProvince(event.target.value)
            setWarning(null)
          }}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">{labels.selectProvince}</option>
          {provinces.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">{labels.city}</Label>
        <select
          id="city"
          name="city"
          defaultValue={defaultCity ?? ''}
          onFocus={() => {
            if (!province) {
              setWarning(labels.provinceRequired)
            }
          }}
          onMouseDown={() => {
            if (!province) {
              setWarning(labels.provinceRequired)
            }
          }}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-disabled={!province}
        >
          <option value="">
            {province ? labels.selectCity : labels.provinceRequired}
          </option>

          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {warning ? (
          <p className="text-xs text-yellow-700">{warning}</p>
        ) : null}
      </div>
    </div>
  )
}