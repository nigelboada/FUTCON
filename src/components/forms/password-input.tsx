'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type PasswordInputProps = {
  id: string
  name: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
}

export function PasswordInput({
  id,
  name,
  placeholder,
  required = false,
  autoComplete,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="pr-11"
      />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible((current) => !current)}
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 px-0"
        aria-label={isVisible ? 'Amagar contrasenya' : 'Mostrar contrasenya'}
      >
        {isVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}