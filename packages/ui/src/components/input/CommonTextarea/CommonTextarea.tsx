import { parseDomSizeValue } from '@yeong/utils/string';
import {
  ChangeEvent,
  CSSProperties,
  forwardRef,
  KeyboardEvent,
  Ref,
  useState,
} from 'react';
import { UI_COLORS } from '../../../constants/color.constants.ts';

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
  ref?: Ref<HTMLTextAreaElement>;
  setTextareaValue: (value: string) => void;
  pressEnter?: () => void;
};

export default forwardRef(function CommonTextarea(
  {
    defaultValue = '',
    width = '100%',
    height = 100,
    borderRadius = 8,
    padding = 8,
    placeholder,
    style,
    alertText,
    disabled,
    setTextareaValue,
    pressEnter,
  }: CommonTextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  const [value, setValue] = useState(defaultValue);
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
        ...style,
      }}
    >
      <textarea
        className="border border-gray focus:outline-main text-black w-full h-full resize-none"
        style={{
          borderRadius: parseDomSizeValue(borderRadius),
          padding: parseDomSizeValue(padding),
          borderColor: alertText ? UI_COLORS.red : UI_COLORS.gray,
        }}
        placeholder={placeholder}
        value={value}
        onChange={changeTextareaValue}
        onKeyUp={handleKeyUp}
        disabled={disabled}
        ref={ref}
      />
      <p className="text-md text-red absolute bottom-[-20px]">{alertText}</p>
    </div>
  );
});
