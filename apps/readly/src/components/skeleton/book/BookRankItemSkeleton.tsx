import { CommonSkeleton } from '@yeong/ui';

export default function BookRankItemSkeleton() {
  return (
    <div className="flex flex-row items-center gap-x-[8px] w-full">
      <CommonSkeleton width={50} height={30} className="rounded-[8px]" />
      <div className="rounded-[8px] p-[16px] flex flex-row items-center gap-x-[16px] w-full">
        <CommonSkeleton width={100} height={145} />
        <div className="flex flex-col gap-y-[16px] flex-1">
          <CommonSkeleton width="80%" height={20} />
          <CommonSkeleton width={100} height={20} />
          <CommonSkeleton width={50} height={20} />
        </div>
      </div>
    </div>
  );
}
