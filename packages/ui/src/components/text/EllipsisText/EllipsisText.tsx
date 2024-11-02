import { parseDomSizeValue } from '@yeong/utils/string';
import './EllipsisText.scss';

type EllipsisTextProps = {
  text: string;
  width?: string | number;
  height?: string | number;
  lineClamp?: number;
  fontSize?: string | number;
};

export default function EllipsisText({
  text,
  width = 'auto',
  height = 'auto',
  lineClamp = 2,
  fontSize = 16,
}: EllipsisTextProps) {
  return (
    <div
      className="ellipsis-text"
      style={{
        WebkitLineClamp: lineClamp,
        width: parseDomSizeValue(width),
        height: parseDomSizeValue(height),
        fontSize: parseDomSizeValue(fontSize),
      }}
    >
      {text}
    </div>
  );
}
