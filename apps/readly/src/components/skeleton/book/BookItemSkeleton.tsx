import { CommonSkeleton } from '@yeong/ui';
import { parseDomSizeValue } from '@yeong/utils/string';

type BookItemProps = {
  isWide?: boolean;
  imageWidth?: string | number;
};

export default function BookItemSkeleton({
  isWide,
  imageWidth = '100%',
}: BookItemProps) {
  return (
    <div
      className="p-[8px] rounded-[8px] w-full h-full flex gap-x-[16px]"
      style={{
        flexDirection: isWide ? 'row' : 'column',
      }}
    >
      <CommonSkeleton width={parseDomSizeValue(imageWidth)} height={200} />
      <div className="py-[8px] flex flex-col gap-y-[8px] flex-1">
        <CommonSkeleton height={24} width="40%" />
        <CommonSkeleton height={24} width="30%" />
        <CommonSkeleton height={24} width="30%" />
        <CommonSkeleton height={24} width="20%" />
      </div>
    </div>
  );
}
