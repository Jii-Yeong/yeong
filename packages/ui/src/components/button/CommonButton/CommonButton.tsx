import { parseDomSizeValue } from '@yeong/utils/string';
import { CSSProperties, ReactNode } from 'react';
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner.tsx';

type CommonButtonProps = {
  text: string;
  backgroundColor?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  borderColor?: string;
  borderWidth?: string | number;
  fontSize?: string | number;
  fontWeight?: string | number;
  padding?: string | number;
  style?: CSSProperties;
  isLeftIcon?: ReactNode;
  isRightIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingColor?: string;
  clickButton?: () => void;
};

export default function CommonButton({
  text,
  backgroundColor = '#ffffff',
  color = '#000000',
  width = 'auto',
  height = 'auto',
  borderRadius = parseDomSizeValue(8),
  borderColor = '#d3d3d3',
  borderWidth = 1,
  fontSize = 14,
  fontWeight = 'normal',
  padding = 8,
  isLeftIcon,
  isRightIcon,
  disabled,
  style,
  isLoading,
  loadingColor = '#5ae9e4',
  clickButton,
}: CommonButtonProps) {
  const handleClickButton = () => {
    if (disabled || isLoading || !clickButton) return;
    clickButton();
  };
  return (
    <button
      className="hover:opacity-60 flex flex-row items-center gap-x-[8px] justify-center disabled:opacity-60"
      onClick={handleClickButton}
      disabled={disabled}
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
      }}
    >
      {isLoading ? (
        <LoadingSpinner size={30} color={loadingColor} />
      ) : (
        <>
          {isLeftIcon}
          {text}
          {isRightIcon}
        </>
      )}
    </button>
  );
}
