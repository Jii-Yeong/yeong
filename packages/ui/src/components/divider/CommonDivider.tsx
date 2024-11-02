import { parseDomSizeValue } from '@yeong/utils/string'

type CommonDividerProps = {
  color?: string
  width?: string | number
  borderWidth?: string | number
  marginVertical?: string | number
}

export default function CommonDivider({
  color = '#d3d3d3',
  width = '100%',
  borderWidth = 1,
  marginVertical = 0,
}: CommonDividerProps) {
  return (
    <div
      className="border-b border-solid"
      style={{
        borderColor: color,
        width: parseDomSizeValue(width),
        borderBottomWidth: parseDomSizeValue(borderWidth),
        marginTop: parseDomSizeValue(marginVertical),
        marginBottom: parseDomSizeValue(marginVertical),
      }}></div>
  )
}
