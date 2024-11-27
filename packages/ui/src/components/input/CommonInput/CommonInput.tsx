import { cva } from 'class-variance-authority';
import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  memo,
  ReactNode,
  Ref,
  useMemo,
} from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { cn } from '../../../utils/class-name.utils.ts';

const commonInputWrapperVariants = cva(
  [
    'relative',
    'border',
    'border-gray',
    'focus:outline-main',
    'rounded-[8px]',
    'p-[8px]',
    'flex',
    'flex-row',
    'items-center',
    'border-gray',
    'gap-x-[4px]',
  ],
  {
    variants: {
      isAlert: {
        true: 'border-red',
      },
    },
    defaultVariants: {
      isAlert: false,
    },
  },
);

type CommonInputProps = {
  value?: string;
  alertText?: string;
  placeholder?: string;
  className?: ClassNameValue;
  innerClassName?: ClassNameValue;
  type?: NonNullable<'text' | 'number'>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (value: string) => void;
  onEnter?: () => void;
} & Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

const CommonInput = forwardRef(
  (
    {
      value,
      alertText,
      placeholder,
      className,
      innerClassName,
      type,
      leftIcon,
      rightIcon,
      onChange,
      onEnter,
      ...rest
    }: CommonInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const handleChangeInputValue = (e: ChangeEvent) => {
      if (!onChange) return;
      const element = e.target as HTMLInputElement;
      onChange(element.value);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (onEnter && e.code === 'Enter') onEnter();
    };

    const divClassName = useMemo(
      () =>
        cn(
          commonInputWrapperVariants({ isAlert: Boolean(alertText) }),
          className,
        ),
      [className, alertText],
    );

    const inputClassName = useMemo(
      () =>
        cn(
          [
            'focus:outline-none',
            'text-black',
            'w-full',
            'h-full',
            'flex-1',
            'bg-transparent',
          ],
          innerClassName,
        ),
      [innerClassName],
    );
    return (
      <div className={divClassName}>
        {leftIcon && leftIcon}
        <input
          className={inputClassName}
          onChange={handleChangeInputValue}
          onKeyUp={handleKeyUp}
          type={type}
          value={value}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {rightIcon && rightIcon}
        <p className="text-md text-red absolute bottom-[-20px]">{alertText}</p>
      </div>
    );
  },
);

CommonInput.displayName = 'CommonInput';
const MemoizedCommonInput = memo(CommonInput);

export { commonInputWrapperVariants, MemoizedCommonInput as default };
export type { CommonInputProps };
