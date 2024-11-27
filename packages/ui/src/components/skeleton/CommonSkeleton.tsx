import { useMemo } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { cn } from '../../utils/class-name.utils.ts';

type CommonSkeletonProps = {
  width?: string | number;
  height?: string | number;
  className?: ClassNameValue;
};

export default function CommonSkeleton({
  width,
  height,
  className,
}: CommonSkeletonProps) {
  const divClassName = useMemo(
    () =>
      cn(['w-full', 'h-full', 'rounded-[16px]', 'bg-light-gray'], className),
    [className],
  );
  return (
    <div
      className={divClassName}
      style={{
        height,
        width,
      }}
    ></div>
  );
}
