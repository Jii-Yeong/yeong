import { ButtonHTMLAttributes, CSSProperties, ReactNode, useMemo } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner.tsx';

type CommonButtonProps = {
  text?: string;
  style?: CSSProperties;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingColor?: string;
  loadingWidth?: number;
  classList?: ClassNameValue;
  clickButton?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CommonButton({
  text = '',
  leftIcon,
  rightIcon,
  disabled,
  isLoading,
  loadingWidth = 30,
  loadingColor = '#5ae9e4',
  className,
  classList,
  clickButton,
  ...rest
}: CommonButtonProps) {
  const handleClickButton = () => {
    if (disabled || isLoading || !clickButton) return;
    clickButton();
  };

  const buttonClassName = useMemo(
    () =>
      twMerge(
        'hover:opacity-100 bg-white text-black text-[14px] rounded-[8px] p-[8px] border border-gray lg:hover:opacity-50 flex flex-row items-center gap-x-[8px] justify-center disabled:opacity-60',
        className,
        classList,
      ),
    [className, classList],
  );
  return (
    <button className={buttonClassName} onClick={handleClickButton} {...rest}>
      {isLoading ? (
        <LoadingSpinner size={loadingWidth} color={loadingColor} />
      ) : (
        <>
          {leftIcon}
          {text}
          {rightIcon}
        </>
      )}
    </button>
  );
}
