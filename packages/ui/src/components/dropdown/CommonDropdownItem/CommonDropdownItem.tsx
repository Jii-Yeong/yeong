import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { CommonDropdownContext } from '../CommonDropdown/CommonDropdown.tsx';

type CommonDropdownItemProps = {
  children: string;
  value: string;
  className?: string;
};

export default function CommonDropdownItem({
  children,
  value,
  className,
}: CommonDropdownItemProps) {
  const { clickDropdownItem } = useContext(CommonDropdownContext);
  const divClassName = twMerge(
    'p-[8px] hover:bg-gray/40 first:rounded-t-[8px] last:rounded-b-[8px] cursor-pointer',
    className,
  );

  const handleClickItem = () => {
    clickDropdownItem(value, children);
  };
  return (
    <div className={divClassName} onClick={handleClickItem}>
      {children}
    </div>
  );
}
