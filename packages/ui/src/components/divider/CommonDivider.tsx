import { HTMLAttributes, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

type CommonDividerProps = {
  color?: string;
  width?: string | number;
  borderWidth?: string | number;
  marginVertical?: string | number;
  className?: string;
  classList?: string[];
} & HTMLAttributes<HTMLDivElement>;

export default function CommonDivider({
  className,
  classList,
  ...rest
}: CommonDividerProps) {
  const divClassName = useMemo(
    () =>
      twMerge('border-b border-solid border-gray w-full', className, classList),
    [className, classList],
  );
  return <div className={divClassName} {...rest}></div>;
}
