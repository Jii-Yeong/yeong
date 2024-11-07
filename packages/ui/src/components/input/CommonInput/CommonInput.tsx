import { parseDomSizeValue } from '@yeong/utils/string';
import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  Ref,
  useMemo,
} from 'react';
import { twMerge } from 'tailwind-merge';

export type CommonInputProps = {
  defaultValue?: string;
  width?: string | number;
  height?: string | number;
  alertText?: string;
  placeholder?: string;
  className?: string;
  classList?: string[];
  wrapperClassName?: string;
  wrapperClassList?: string[];
  type?: string;
  setInputValue?: (value: string) => void;
  pressEnter?: () => void;
} & HTMLAttributes<HTMLInputElement>;

export default forwardRef(function CommonInput(
  {
    defaultValue = '',
    width = '100%',
    height = 40,
    alertText,
    wrapperClassName,
    wrapperClassList,
    className,
    classList,
    type,
    setInputValue,
    pressEnter,
    ...rest
  }: CommonInputProps,
  ref: Ref<HTMLInputElement>,
) {
  const changeInputValue = (e: ChangeEvent) => {
    if (!setInputValue) return;
    const element = e.target as HTMLInputElement;
    setInputValue(element.value);
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (pressEnter && e.code === 'Enter') pressEnter();
  };

  const divClassName = useMemo(
    () => twMerge('flex flex-col relative', wrapperClassName, wrapperClassList),
    [wrapperClassName, wrapperClassList],
  );

  const inputClassName = useMemo(
    () =>
      twMerge(
        'border border-gray focus:outline-main text-black w-full h-full rounded-[8px] p-[8px]',
        [alertText ? 'border-red' : 'border-gray'],
        className,
        classList,
      ),
    [className, classList],
  );
  return (
    <div
      className={divClassName}
      style={{
        width: parseDomSizeValue(width),
        height: parseDomSizeValue(height),
      }}
    >
      <input
        className={inputClassName}
        onChange={changeInputValue}
        onKeyUp={handleKeyUp}
        type={type}
        ref={ref}
        {...rest}
      />
      <p className="text-md text-red absolute bottom-[-20px]">{alertText}</p>
    </div>
  );
});
