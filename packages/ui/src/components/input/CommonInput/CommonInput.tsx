import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  Ref,
  useMemo,
} from 'react';
import { twMerge } from 'tailwind-merge';

export type CommonInputProps = {
  value?: string;
  alertText?: string;
  placeholder?: string;
  className?: string;
  classList?: string[];
  wrapperClassName?: string;
  wrapperClassList?: string[];
  type?: string;
  rightIcon?: ReactNode;
  setInputValue?: (value: string) => void;
  pressEnter?: () => void;
} & HTMLAttributes<HTMLInputElement>;

export default forwardRef(
  (
    {
      value,
      alertText,
      wrapperClassName,
      wrapperClassList,
      className,
      classList,
      type,
      rightIcon,
      setInputValue,
      pressEnter,
      ...rest
    }: CommonInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const changeInputValue = (e: ChangeEvent) => {
      if (!setInputValue) return;
      const element = e.target as HTMLInputElement;
      setInputValue(element.value);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (pressEnter && e.code === 'Enter') pressEnter();
    };

    const divClassName = useMemo(
      () =>
        twMerge(
          'flex flex-col relative border border-gray focus:outline-main rounded-[8px] p-[8px] flex flex-row items-center',
          [alertText ? 'border-red' : 'border-gray'],
          wrapperClassName,
          wrapperClassList,
        ),
      [wrapperClassName, wrapperClassList],
    );

    const inputClassName = useMemo(
      () =>
        twMerge(
          'focus:outline-none text-black w-full h-full flex-1',
          className,
          classList,
        ),
      [className, classList],
    );
    return (
      <div className={divClassName}>
        <input
          className={inputClassName}
          onChange={changeInputValue}
          onKeyUp={handleKeyUp}
          type={type}
          value={value}
          ref={ref}
          {...rest}
        />
        {rightIcon && rightIcon}
        <p className="text-md text-red absolute bottom-[-20px]">{alertText}</p>
      </div>
    );
  },
);
