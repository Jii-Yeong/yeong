import {
  createContext,
  InputHTMLAttributes,
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
  children: ReactNode;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

type CommonDropdownContextType = {
  clickDropdownItem: (value: string, children: ReactNode) => void;
};

export const CommonDropdownContext = createContext<CommonDropdownContextType>({
  clickDropdownItem: () => {},
});

export default function CommonDropdown({
  placeholder = '선택',
  className,
  children,
  value,
  onChange,
  ...rest
}: CommonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [itemChildren, setItemChildren] = useState<ReactNode | null>(null);

  const divClassName = twMerge(
    'p-[8px] border border-solid border-gray rounded-[8px] min-w-[100px] flex flex-row items-center justify-between cursor-pointer',
    className,
  );

  const handleClickController = () => {
    setIsOpen(!isOpen);
  };

  const clickDropdownItem = (value: string, children: ReactNode) => {
    setIsOpen(false);
    onChange(value);
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
      <div className={divClassName} onClick={handleClickController}>
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
      <CommonDropdownContext.Provider value={{ clickDropdownItem }}>
        {isOpen && children}
      </CommonDropdownContext.Provider>
      <input type="hidden" value={value} aria-hidden="true" {...rest} />
    </div>
  );
}
