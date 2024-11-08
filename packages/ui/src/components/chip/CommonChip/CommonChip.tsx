import { twMerge } from 'tailwind-merge';
import { UI_COLORS } from '../../../constants/color.constants.ts';

type CommonChipProps = {
  text: string;
  className?: string;
  classList?: string;
  backgroundColor?: string;
  activeColor?: string;
  isActive?: boolean;
};

export default function CommonChip({
  text,
  className,
  classList,
  backgroundColor = UI_COLORS.lightBlue,
  activeColor = UI_COLORS.blue,
  isActive,
}: CommonChipProps) {
  const divClassName = twMerge(
    'text-[14px] py-[2px] px-[8px] rounded-full cursor-pointer',
    [
      isActive ? `bg-[${activeColor}]` : `bg-[${backgroundColor}]`,
      isActive ? 'text-white' : `text-[${activeColor}]`,
    ],
    className,
    classList,
  );
  return <div className={divClassName}>{text}</div>;
}
