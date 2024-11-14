import { twMerge } from 'tailwind-merge';
import { UI_COLORS } from '../../../constants/color.constants.ts';

type CommonChipProps = {
  text: string;
  value?: string;
  className?: string;
  classList?: string;
  backgroundColor?: string;
  activeColor?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: (value: string) => void;
};

export default function CommonChip({
  text,
  value,
  className,
  classList,
  backgroundColor = UI_COLORS.lightBlue,
  activeColor = UI_COLORS.blue,
  isActive,
  disabled,
  onClick,
}: CommonChipProps) {
  const divClassName = twMerge(
    'text-[14px] py-[2px] px-[8px] rounded-full cursor-pointer w-max hover:opacity-60',
    [disabled && 'opacity-40  hover:opacity-40', disabled && 'cursor-default'],
    className,
    classList,
  );

  const handleClickChip = () => {
    if (!disabled && onClick) onClick(value || '');
  };
  return (
    <div
      className={divClassName}
      style={{
        backgroundColor: isActive ? activeColor : backgroundColor,
        color: isActive ? UI_COLORS.white : activeColor,
      }}
      onClick={handleClickChip}
    >
      {text}
    </div>
  );
}
