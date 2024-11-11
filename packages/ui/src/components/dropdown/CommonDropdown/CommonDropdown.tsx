import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Icon } from '@iconify/react';
import { UI_COLORS } from '../../../constants/color.constants.ts';
import { twMerge } from 'tailwind-merge';

type CommonDropdownProps = {
  placeholder?: string;
  className?: string;
  classList?: string[];
  clickItem: (value: string) => void;
  children: (props: {
    clickItem: (value: string, children: ReactNode) => void;
  }) => ReactElement;
};

export default function CommonDropdown({
  placeholder = '선택',
  className,
  classList,
  clickItem,
  children,
}: CommonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [itemChildren, setItemChildren] = useState<ReactNode | null>(null);

  const divClassName = twMerge(
    'p-[8px] border border-solid border-gray rounded-[8px] min-w-[100px] flex flex-row items-center justify-between cursor-pointer',
    className,
    classList,
  );

  const clickController = () => {
    setIsOpen(!isOpen);
  };

  const clickDropdownItem = (value: string, children: ReactNode) => {
    setIsOpen(false);
    clickItem(value);
    setItemChildren(children);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (dropdownRef.current && !dropdownRef.current.contains(element)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={dropdownRef} className="relative">
      <div className={divClassName} onClick={clickController}>
        {placeholder && !itemChildren ? (
          <p className="text-dark-gray">{placeholder}</p>
        ) : (
          <div>{itemChildren}</div>
        )}
        <Icon
          icon="bxs:down-arrow"
          rotate={isOpen ? 90 : 0}
          color={UI_COLORS.darkGray}
        />
      </div>
      {isOpen && children({ clickItem: clickDropdownItem })}
    </div>
  );
}
