import { cva, VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { UI_COLORS } from '../../../constants/color.constants.ts';
import { cn } from '../../../utils/class-name.utils.ts';
import './LoadingSpinner.scss';

const loadingSpinnerVariants = cva(['rounded-full', 'border', 'border-solid'], {
  variants: {
    size: {
      small: ['w-[24px]', 'h-[24px]', 'border-[3px]'],
      medium: ['w-[50px]', 'h-[50px]', 'border-[4px]'],
      large: ['w-[80px]', 'h-[80px]', 'border-[6px]'],
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type LoadingSpinnerVariant = VariantProps<typeof loadingSpinnerVariants>;

type LoadingSpinnerProps = {
  color?: string;
  backgroundColor?: string;
  size?: NonNullable<LoadingSpinnerVariant['size']>;
  className?: ClassNameValue;
};

function LoadingSpinner({
  color = UI_COLORS.main,
  backgroundColor = UI_COLORS.white,
  size,
  className,
}: LoadingSpinnerProps) {
  const divClassName = useMemo(
    () => cn(loadingSpinnerVariants({ size }), 'loading-spinner', className),
    [size, className],
  );
  return (
    <div
      className={divClassName}
      style={{
        borderTopColor: color,
        borderBottomColor: backgroundColor,
        borderLeftColor: backgroundColor,
        borderRightColor: backgroundColor,
      }}
    ></div>
  );
}

export { LoadingSpinner as default, loadingSpinnerVariants };
export type { LoadingSpinnerProps, LoadingSpinnerVariant };
