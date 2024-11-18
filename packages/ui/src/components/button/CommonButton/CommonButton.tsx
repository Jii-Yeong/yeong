import { ButtonHTMLAttributes, useMemo } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner.tsx';
import { Icon, IconProps } from '@iconify/react/dist/iconify.js';

type CommonButtonProps = {
  text?: string;
  leftIconProps?: IconProps;
  rightIconProps?: IconProps;
  disabled?: boolean;
  isLoading?: boolean;
  loadingColor?: string;
  loadingWidth?: number;
  classList?: ClassNameValue;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CommonButton({
  text = '',
  leftIconProps,
  rightIconProps,
  disabled,
  isLoading,
  loadingWidth = 27,
  loadingColor = '#5ae9e4',
  className,
  classList,
  onClick,
  ...rest
}: CommonButtonProps) {
  const handleClickButton = () => {
    if (disabled || isLoading || !onClick) return;
    onClick();
  };

  const buttonClassName = useMemo(
    () =>
      twMerge(
        'hover:opacity-100 bg-white text-black text-[14px] rounded-[8px] p-[8px] border border-gray lg:hover:opacity-50 flex flex-row items-center gap-x-[8px] justify-center disabled:opacity-60 disabled:hover:opacity-60',
        className,
        classList,
      ),
    [className, classList],
  );
  return (
    <button
      className={buttonClassName}
      onClick={handleClickButton}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <LoadingSpinner size={loadingWidth} color={loadingColor} />
      ) : (
        <>
          {leftIconProps && <Icon {...leftIconProps} />}
          {text}
          {rightIconProps && <Icon {...rightIconProps} />}
        </>
      )}
    </button>
  );
}
