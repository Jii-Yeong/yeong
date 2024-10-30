import { COLORS } from '@/constants/color.constants'
import { parseDomSizeValue } from '@/utils/string.utils'
import { CSSProperties } from 'react'

type CommonButtonProps = {
  text: string
  backgroundColor?: string
  color?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  borderColor?: string
  borderWidth?: string | number
  fontSize?: string | number
  fontWeight?: string | number
  padding?: string | number
  style?: CSSProperties
  clickButton?: () => void
}

export default function CommonButton({
  text,
  backgroundColor = COLORS.white,
  color = COLORS.black,
  width = 'auto',
  height = 'auto',
  borderRadius = parseDomSizeValue(8),
  borderColor = COLORS.gray,
  borderWidth = 1,
  fontSize = 14,
  fontWeight = 'normal',
  padding = 8,
  style,
  clickButton,
}: CommonButtonProps) {
  return (
    <button
      className="hover:opacity-60"
      onClick={clickButton}
      style={{
        backgroundColor,
        color,
        width: parseDomSizeValue(width),
        height: parseDomSizeValue(height),
        borderRadius: parseDomSizeValue(borderRadius),
        borderColor,
        borderWidth: parseDomSizeValue(borderWidth),
        fontSize: parseDomSizeValue(fontSize),
        fontWeight,
        padding: parseDomSizeValue(padding),
        ...style,
      }}>
      {text}
    </button>
  )
}
