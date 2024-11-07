import { parseDomSizeValue } from '@yeong/utils/string';
import {
  ChangeEvent,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  Ref,
  useMemo,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

export type CommonTextareaProps = {
  defaultValue?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  padding?: string | number;
  placeholder?: string;
  style?: CSSProperties;
  type?: string;
  alertText?: string;
  disabled?: boolean;
  className?: string;
  classList?: string;
  ref?: Ref<HTMLTextAreaElement>;
  setTextareaValue: (value: string) => void;
  pressEnter?: () => void;
} & HTMLAttributes<HTMLTextAreaElement>;

export default forwardRef(function CommonTextarea(
  {
    defaultValue = '',
    width = '100%',
    height = 100,
    alertText,
    className,
    classList,
    setTextareaValue,
    pressEnter,
    ...rest
  }: CommonTextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  const [value, setValue] = useState(defaultValue);

  const textareaClassName = useMemo(
    () =>
      twMerge(
        'border border-gray focus:outline-main text-black w-full h-full resize-none rounded-[8px] p-[8px]',
        [alertText ? 'border-red' : 'border-gray'],
        className,
        classList,
      ),
    [className, classList],
  );

  const changeTextareaValue = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setValue(element.value);
    setTextareaValue(element.value);
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (pressEnter && e.code === 'Enter') pressEnter();
  };
  return (
    <div
      className="flex flex-col relative"
      style={{
        width: parseDomSizeValue(width),
        height: parseDomSizeValue(height),
      }}
    >
      <textarea
        className={textareaClassName}
        value={value}
        onChange={changeTextareaValue}
        onKeyUp={handleKeyUp}
        ref={ref}
        {...rest}
      />
      <p className="text-md text-red absolute bottom-[-20px]">{alertText}</p>
    </div>
  );
});
