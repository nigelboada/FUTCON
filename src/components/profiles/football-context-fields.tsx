'use client'

import { useMemo, useState } from 'react'
import type { Locale } from '@/lib/i18n/config'
import {
  coachLicenses,
  footballCategories,
  footballDivisions,
  footballModalities,
  getLocalizedLabel,
} from '@/lib/football/catalog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type ClubOption = {
  club_name: string | null
  modality: string | null
  category: string | null
  division_level: string | null
}

type FootballContextFieldsProps = {
  locale: Locale
  defaultModality?: string | null
  defaultCategory?: string | null
  defaultDivision?: string | null
  defaultClub?: string | null
  defaultLicense?: string | null
  clubOptions: ClubOption[]
  showClub?: boolean
  showLicense?: boolean
  fieldNames: {
    modality: string
    category: string
    division: string
    club?: string
    license?: string
  }
  labels: {
    modality: string
    category: string
    division: string
    club: string
    license: string
    selectModality: string
    selectCategory: string
    selectDivision: string
    selectLicense: string
    categoryRequired: string
    manualClubPlaceholder: string
  }
}

export function FootballContextFields({
  locale,
  defaultModality,
  defaultCategory,
  defaultDivision,
  defaultClub,
  defaultLicense,
  clubOptions,
  showClub = true,
  showLicense = false,
  fieldNames,
  labels,
}: FootballContextFieldsProps) {
  const [modality, setModality] = useState(defaultModality ?? '')
  const [category, setCategory] = useState(defaultCategory ?? '')
  const [warning, setWarning] = useState<string | null>(null)

  const divisions = useMemo(() => {
    if (!modality || !category) return []
    return footballDivisions[modality]?.[category] ?? []
  }, [modality, category])

  const filteredClubs = useMemo(() => {
    return clubOptions.filter((club) => {
      if (!club.club_name) return false
      if (modality && club.modality && club.modality !== modality) return false
      if (category && club.category && club.category !== category) return false
      return true
    })
  }, [clubOptions, modality, category])

  const datalistId = `${fieldNames.club ?? 'club'}-options`

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor={fieldNames.modality}>{labels.modality}</Label>
          <select
            id={fieldNames.modality}
            name={fieldNames.modality}
            value={modality}
            onChange={(event) => {
              setModality(event.target.value)
              setCategory('')
              setWarning(null)
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">{labels.selectModality}</option>
            {footballModalities.map((item) => (
              <option key={item.value} value={item.value}>
                {getLocalizedLabel(item, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={fieldNames.category}>{labels.category}</Label>
          <select
            id={fieldNames.category}
            name={fieldNames.category}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            onFocus={() => {
              if (!modality) {
                setWarning(labels.selectModality)
              }
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            disabled={!modality}
          >
            <option value="">{labels.selectCategory}</option>
            {footballCategories.map((item) => (
              <option key={item.value} value={item.value}>
                {getLocalizedLabel(item, locale)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={fieldNames.division}>{labels.division}</Label>
          <select
            id={fieldNames.division}
            name={fieldNames.division}
            defaultValue={defaultDivision ?? ''}
            onFocus={() => {
              if (!modality || !category) {
                setWarning(labels.categoryRequired)
              }
            }}
            onMouseDown={() => {
              if (!modality || !category) {
                setWarning(labels.categoryRequired)
              }
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">
              {modality && category
                ? labels.selectDivision
                : labels.categoryRequired}
            </option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>

          {warning ? (
            <p className="text-xs text-yellow-700">{warning}</p>
          ) : null}
        </div>
      </div>

      {showClub && fieldNames.club ? (
        <div className="space-y-2">
          <Label htmlFor={fieldNames.club}>{labels.club}</Label>
          <Input
            id={fieldNames.club}
            name={fieldNames.club}
            defaultValue={defaultClub ?? ''}
            list={datalistId}
            placeholder={labels.manualClubPlaceholder}
          />

          <datalist id={datalistId}>
            {filteredClubs.map((club) => (
              <option key={club.club_name ?? ''} value={club.club_name ?? ''} />
            ))}
          </datalist>
        </div>
      ) : null}

      {showLicense && fieldNames.license ? (
        <div className="space-y-2">
          <Label htmlFor={fieldNames.license}>{labels.license}</Label>
          <select
            id={fieldNames.license}
            name={fieldNames.license}
            defaultValue={defaultLicense ?? ''}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">{labels.selectLicense}</option>
            {coachLicenses.map((license) => (
              <option key={license} value={license}>
                {license}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  )
}
