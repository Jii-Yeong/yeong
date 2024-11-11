import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CommonDropdownItemProps = {
  children: string;
  value: string;
  className?: string;
  classList?: string[];
  clickItem: (value: string, children: ReactNode) => void;
};

export default function CommonDropdownItem({
  children,
  value,
  className,
  classList,
  clickItem,
}: CommonDropdownItemProps) {
  const divClassName = twMerge(
    'p-[8px] hover:bg-gray/40 first:rounded-t-[8px] last:rounded-b-[8px]',
    className,
    classList,
  );

  const handleClickItem = () => {
    clickItem(value, children);
  };
  return (
    <div className={divClassName} onClick={handleClickItem}>
      {children}
    </div>
  );
}
