"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { useCallback, useState } from "react"
import { debounce } from "lodash"

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
}

export function SearchBar({
  placeholder,
  value,
  onChange,
  icon
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)

  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onChange(value)
    }, 300),
    []
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    debouncedOnChange(newValue)
  }

  return (
    <div className="relative w-full max-w-[400px]">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className={`h-9 ${icon ? "pl-10" : ""} bg-white border shadow-sm`}
      />
    </div>
  )
}
