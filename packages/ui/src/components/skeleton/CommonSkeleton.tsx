import { parseDomSizeValue } from '@yeong/utils/string';
import { UI_COLORS } from '../../constants/color.constants.ts';

type CommonSkeletonProps = {
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
};

export default function CommonSkeleton({
  backgroundColor = UI_COLORS.lightGray,
  borderRadius = 16,
  height = '100%',
  width = '100%',
}: CommonSkeletonProps) {
  return (
    <div
      style={{
        backgroundColor,
        borderRadius: parseDomSizeValue(borderRadius),
        height: parseDomSizeValue(height),
        width: parseDomSizeValue(width),
      }}
    ></div>
  );
}
