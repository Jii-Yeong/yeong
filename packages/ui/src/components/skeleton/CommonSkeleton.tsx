import { useMemo } from 'react';
import { cn } from '../../utils/class-name.utils.ts';
import { ClassNameValue } from 'tailwind-merge';

type CommonSkeletonProps = {
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: ClassNameValue;
};

export default function CommonSkeleton({
  height,
  width,
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
