import { ButtonHTMLAttributes, CSSProperties, ReactNode, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner.tsx';

type CommonButtonProps = {
  text: string;
  style?: CSSProperties;
  isLeftIcon?: ReactNode;
  isRightIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingColor?: string;
  loadingWidth?: number;
  classList?: string[];
  clickButton?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CommonButton({
  text,
  isLeftIcon,
  isRightIcon,
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
          {isLeftIcon}
          {text}
          {isRightIcon}
        </>
      )}
    </button>
  );
}
