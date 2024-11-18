import { ButtonHTMLAttributes, ReactNode, useMemo } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import LoadingSpinner from '../../loading/LoadingSpinner/LoadingSpinner.tsx';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/class-name.utils.ts';
import { UI_COLORS } from '../../../constants/color.constants.ts';

const ButtonVariants = cva(
  'hover:opacity-100 text-white text-[16px] border border-transparent rounded-[8px] px-[16px] py-[6px] flex flex-row items-center gap-x-[8px] justify-center disabled:opacity-60 disabled:hover:opacity-60 transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-main lg:hover:bg-dark-main disabled:hover:bg-main',
        secondary: 'bg-gray lg:hover:bg-dark-gray disabled:hover:bg-gray',
        red: 'bg-red lg:hover:bg-dark-red disabled:hover:bg-red',
        outline:
          'bg-white border-gray text-black lg:hover:bg-light-gray disabled:hover:bg-white',
        ghost:
          'bg-transparent text-black lg:hover:bg-light-gray disabled:hover:bg-transparent',
        link: 'bg-transparent text-black underline lg:hover:bg-light-gray disabled:hover:bg-transparent',
      },
    },
  },
);

type CommonButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingColor?: string;
  loadingWidth?: number;
  className?: ClassNameValue;
  variant?: 'primary' | 'secondary' | 'outline' | 'red' | 'ghost' | 'link';
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  VariantProps<typeof ButtonVariants>;

export default function CommonButton({
  children,
  disabled,
  isLoading,
  loadingWidth = 23,
  loadingColor = '#5ae9e4',
  className,
  variant = 'primary',
  onClick,
  ...rest
}: CommonButtonProps) {
  const buttonClassName = useMemo(
    () => cn(ButtonVariants({ variant }), className),
    [className, variant],
  );

  const parsedLoadingColor = useMemo(() => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'red':
        return UI_COLORS.white;
      default:
        return loadingColor;
    }
  }, [loadingColor, variant]);

  const handleClickButton = () => {
    if (disabled || isLoading || !onClick) return;
    onClick();
  };

  return (
    <button
      className={buttonClassName}
      onClick={handleClickButton}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <LoadingSpinner size={loadingWidth} color={parsedLoadingColor} />
      ) : (
        children
      )}
    </button>
  );
}
