import { parseDomSizeValue } from '@yeong/utils/string';
import './LoadingSpinner.scss';

type LoadingSpinnerProps = {
  color?: string;
  backgroundColor?: string;
  size?: string | number;
};

export default function LoadingSpinner({
  backgroundColor,
  color,
  size = 50,
}: LoadingSpinnerProps) {
  return (
    <div
      className="loading-spinner"
      style={{
        borderColor: backgroundColor,
        borderTopColor: color,
        width: parseDomSizeValue(size),
        height: parseDomSizeValue(size),
      }}
    ></div>
  );
}
