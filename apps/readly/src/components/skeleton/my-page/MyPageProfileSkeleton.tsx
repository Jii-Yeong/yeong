import { CommonSkeleton } from '@yeong/ui';

export default function MyPageProfileSkeleton() {
  return (
    <div className="flex flex-col gap-y-[16px]">
      <CommonSkeleton width={148} height={148} className="rounded-full" />
      <CommonSkeleton width={150} height={30} />
    </div>
  );
}
