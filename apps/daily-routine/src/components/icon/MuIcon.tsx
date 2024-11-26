import { parseDomSizeValue } from "@/utils/string.utils.ts"

type MuIcon = {
  icon: string
  cursor?: string
  size?: string | number
  clickIcon?: () => void
}

export default function MuIcon({
  size = "16",
  icon,
  cursor = "default",
  clickIcon,
}: MuIcon) {
  const iconStyle = {
    fontSize: parseDomSizeValue(size),
    cursor,
  }
  return (
    <span className="material-icons" style={iconStyle} onClick={clickIcon}>
      {icon}
    </span>
  )
}
