import { parseDomSizeValue } from "@/utils/string.utils.ts"
import "./DefaultButton.scoped.scss"

type DefaultButtonProps = {
  text: string
  onClickButton: () => void
  padding?: string | number
  color?: string
  backgroundColor?: string
  fontSize?: string | number
  width?: string | number
  height?: string | number
  type?: string
}

export default function DefaultButton({
  text,
  onClickButton,
  padding = "4px 8px",
  color,
  backgroundColor,
  fontSize = 14,
  width = "auto",
  height = "auto",
}: DefaultButtonProps) {
  const buttonStyle = {
    width: parseDomSizeValue(width),
    height: parseDomSizeValue(height),
    padding: parseDomSizeValue(padding),
    color: color,
    backgroundColor: backgroundColor,
    fontSize: parseDomSizeValue(fontSize),
  }
  return (
    <div className="default-button" onClick={onClickButton} style={buttonStyle}>
      {text}
    </div>
  )
}
