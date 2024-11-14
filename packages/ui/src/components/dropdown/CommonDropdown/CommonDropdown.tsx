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
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner.tsx';

type CommonDropdownProps = {
  value: string;
  children: ReactNode;
  placeholder?: string;
  className?: string;
  label?: ReactNode;
  isLoading?: boolean;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

type CommonDropdownContextType = {
  clickDropdownItem: (value: string, children: ReactNode) => void;
  currentValue: string;
};

export const CommonDropdownContext = createContext<CommonDropdownContextType>({
  clickDropdownItem: () => {},
  currentValue: '',
});

export default function CommonDropdown({
  value,
  placeholder = '선택',
  className,
  children,
  label,
  isLoading,
  onChange,
  ...rest
}: CommonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [itemChildren, setItemChildren] = useState<ReactNode | null>(label);

  const divClassName = twMerge(
    'p-[8px] border border-solid border-gray rounded-[8px] min-w-[100px] flex flex-row items-center justify-between',
    [isLoading ? 'cursor-default' : 'cursor-pointer'],
    className,
  );

  const handleClickController = () => {
    setIsOpen(!isOpen);
  };

  const clickDropdownItem = (value: string, children: ReactNode) => {
    if (isLoading) return;
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
        {isLoading ? (
          <LoadingSpinner size={20} />
        ) : (
          <Icon
            icon="bxs:down-arrow"
            rotate={isOpen ? 90 : 0}
            color={UI_COLORS.darkGray}
          />
        )}
      </div>
      <CommonDropdownContext.Provider
        value={{ clickDropdownItem, currentValue: value }}
      >
        {isOpen && children}
      </CommonDropdownContext.Provider>
      <input type="hidden" value={value} aria-hidden="true" {...rest} />
    </div>
  );
}
