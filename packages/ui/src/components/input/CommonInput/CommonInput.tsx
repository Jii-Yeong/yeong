import { parseDomSizeValue } from '@yeong/utils/string';
import { ChangeEvent, CSSProperties, KeyboardEvent, useState } from 'react';
import { UI_COLORS } from '../../../constants/color.constants.ts';

export type CommonInputProps = {
  defaultValue?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  padding?: string | number;
  placeholder?: string;
  style?: CSSProperties;
  type?: string;
  alertText?: string;
  setInputValue: (value: string) => void;
  pressEnter?: () => void;
};

export default function CommonInput({
  defaultValue = '',
  width = '100%',
  height = 40,
  borderRadius = 8,
  padding = 8,
  placeholder,
  style,
  type = 'text',
  alertText,
  setInputValue,
  pressEnter,
}: CommonInputProps) {
  const [value, setValue] = useState(defaultValue);
  const changeInputValue = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setValue(element.value);
    setInputValue(element.value);
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
      <input
        className="border border-gray focus:outline-main text-black w-full h-full"
        style={{
          borderRadius: parseDomSizeValue(borderRadius),
          padding: parseDomSizeValue(padding),
          borderColor: alertText ? UI_COLORS.red : UI_COLORS.gray,
        }}
        placeholder={placeholder}
        value={value}
        onChange={changeInputValue}
        onKeyUp={handleKeyUp}
        type={type}
      />
      <p className="text-md text-red absolute bottom-[-20px]">{alertText}</p>
    </div>
  );
}
