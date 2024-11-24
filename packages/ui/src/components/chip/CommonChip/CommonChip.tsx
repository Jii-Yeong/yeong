import { cva, VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  HTMLAttributes,
  memo,
  MouseEvent,
  Ref,
  useMemo,
} from 'react';
import { UI_COLORS } from '../../../constants/color.constants.ts';
import { cn } from '../../../utils/class-name.utils.ts';

const chipVariants = cva(
  [
    'text-[14px]',
    'py-[2px]',
    'px-[8px]',
    'rounded-full',
    'cursor-pointer',
    'w-max',
    'hover:opacity-60',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-light-blue', 'text-blue'],
        secondary: ['bg-light-gray', 'text-dark-gray'],
        outline: ['bg-white', 'border', 'border-gray', 'text-black'],
        red: ['bg-light-red', 'text-red'],
        green: ['bg-light-green', 'text-green'],
        brown: ['bg-light-brown', 'text-brown'],
      },
      disabled: {
        true: ['opacity-40', 'hover:opacity-40', 'cursor-default'],
      },
      active: {
        true: ['text-white'],
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        active: true,
        class: 'bg-blue',
      },
      {
        variant: 'secondary',
        active: true,
        class: 'bg-dark-gray',
      },
      {
        variant: 'outline',
        active: true,
        class: 'bg-gray',
      },
      {
        variant: 'red',
        active: true,
        class: 'bg-red',
      },
      {
        variant: 'green',
        active: true,
        class: 'bg-green',
      },
      {
        variant: 'brown',
        active: true,
        class: 'bg-brown',
      },
    ],
    defaultVariants: {
      disabled: false,
      active: false,
      variant: 'primary',
    },
  },
);

type ChipVariant = NonNullable<VariantProps<typeof chipVariants>>;

type CommonChipProps = {
  text: string;
  value?: string;
  className?: string;
  backgroundColor?: string;
  activeColor?: string;
  isActive?: boolean;
  disabled?: boolean;
  variant?: ChipVariant['variant'];
  onClick?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'>;

const CommonChip = forwardRef(
  (
    {
      text,
      value,
      className,
      backgroundColor,
      activeColor,
      isActive,
      disabled,
      variant,
      onClick,
    }: CommonChipProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const divClassName = useMemo(
      () =>
        cn(chipVariants({ disabled, active: isActive, variant }), className),
      [disabled, isActive, variant, className],
    );

    const handleClickChip = (e: MouseEvent) => {
      e.preventDefault();
      if (!disabled && onClick) onClick(value || '');
    };
    return (
      <div
        className={divClassName}
        style={{
          backgroundColor:
            backgroundColor && isActive ? activeColor : backgroundColor,
          color: activeColor && isActive ? UI_COLORS.white : activeColor,
        }}
        onClick={handleClickChip}
        ref={ref}
      >
        {text}
      </div>
    );
  },
);

CommonChip.displayName = 'CommonChip';

const MemoizedCommonChip = memo(CommonChip);

export { MemoizedCommonChip as default };
export type { CommonChipProps };
