import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CommonDropdownInnerProps = {
  children: ReactNode;
  className?: string;
  classList?: string[];
};

export default function CommonDropdownInner({
  className,
  classList,
  children,
}: CommonDropdownInnerProps) {
  const divClassName = twMerge(
    'absolute shadow-lg shadow-main/40 min-w-full rounded-[8px] z-10 bg-white',
    className,
    classList,
  );
  return <div className={divClassName}>{children}</div>;
}
