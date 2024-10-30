import { parseDomSizeValue } from '@/utils/string.utils'
import { ChangeEvent, CSSProperties, useState, KeyboardEvent } from 'react'

export type CommonInputProps = {
  defaultValue?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  padding?: string | number
  placeholder?: string
  style?: CSSProperties
  setInputValue: (value: string) => void
  pressEnter?: () => void
}

export default function CommonInput({
  defaultValue = '',
  width = '100%',
  height = 40,
  borderRadius = 8,
  padding = 8,
  placeholder,
  style,
  setInputValue,
  pressEnter,
}: CommonInputProps) {
  const [value, setValue] = useState(defaultValue)
  const changeInputValue = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setValue(element.value)
    setInputValue(element.value)
  }
  const handleKeyUp = (e: KeyboardEvent) => {
    if (pressEnter && e.code === 'Enter') pressEnter()
  }
  return (
    <input
      className="border border-gray focus:outline-main text-black"
      style={{
        width: parseDomSizeValue(width),
        height: parseDomSizeValue(height),
        borderRadius: parseDomSizeValue(borderRadius),
        padding: parseDomSizeValue(padding),
        ...style,
      }}
      placeholder={placeholder}
      value={value}
      onChange={changeInputValue}
      onKeyUp={handleKeyUp}
    />
  )
}
