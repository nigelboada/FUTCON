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
  }
}

export function LocationSelects({
  defaultProvince,
  defaultCity,
  labels,
}: LocationSelectsProps) {
  const [province, setProvince] = useState(defaultProvince ?? '')
  const cities = useMemo(() => getCitiesByProvince(province), [province])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="province">{labels.province}</Label>
        <select
          id="province"
          name="province"
          value={province}
          onChange={(event) => setProvince(event.target.value)}
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
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          disabled={!province}
        >
          <option value="">{labels.selectCity}</option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}