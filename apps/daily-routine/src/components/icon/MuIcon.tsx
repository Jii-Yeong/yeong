import { parseDomSizeValue } from '@/utils/string.utils.ts';
import { useMemo } from 'react';

type MuIcon = {
  icon: string;
  cursor?: string;
  size?: string | number;
  className?: string;
  clickIcon?: () => void;
};

export default function MuIcon({
  size = '16',
  icon,
  cursor = 'default',
  className,
  clickIcon,
}: MuIcon) {
  const iconStyle = {
    fontSize: parseDomSizeValue(size),
    cursor,
  };

  const iconClassName = useMemo(
    () => `material-icons ${className}`,
    [className]
  );
  return (
    <span className={iconClassName} style={iconStyle} onClick={clickIcon}>
      {icon}
    </span>
  );
}
