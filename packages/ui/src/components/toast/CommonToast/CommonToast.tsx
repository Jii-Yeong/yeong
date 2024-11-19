import { cva } from 'class-variance-authority';
import {
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
  Ref,
  useMemo,
} from 'react';
import { cn } from '../../../utils/class-name.utils.ts';
import { ClassNameValue } from 'tailwind-merge';
import { CommonButton, useToast } from '../../../index.ts';
import './CommonToast.scss';

const toastVariants = cva(
  [
    'w-[280px]',
    'border',
    'border-gray',
    'rounded-[8px]',
    'p-[16px]',
    'absolute',
    'top-[16px]',
    'right-[16px]',
    'transition-all',
  ].join(' '),
  {
    variants: {
      show: {
        true: 'right-[16px]',
        false: 'right-[-280px]',
      },
    },
  },
);

interface CommonToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  className?: ClassNameValue;
  closeChildren?: ReactNode;
  title?: string;
  description?: string;
  isShow?: boolean;
  index?: number;
  height?: number;
  id?: string;
}

const TOP_MARGIN = 16;

const CommonToast = forwardRef(
  (
    {
      className,
      title,
      description,
      closeChildren,
      isShow,
      index,
      height,
      id,
    }: CommonToastProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { dismiss } = useToast();
    const divClassName = useMemo(
      () => cn(toastVariants({ show: isShow }), className),
      [className, isShow],
    );

    const closeContent = useMemo(
      () =>
        closeChildren || <CommonButton variant="outline">닫기</CommonButton>,
      [closeChildren],
    );

    const topPosition = useMemo(() => {
      if (!height || !index) return TOP_MARGIN;
      return (height + TOP_MARGIN) * index + TOP_MARGIN;
    }, [height, index]);

    const handleClickClose = () => {
      if (!id) return;
      dismiss(id);
    };

    return (
      <div
        className={`common-toast ${divClassName}`}
        ref={ref}
        style={{ top: topPosition }}
      >
        <div className="flex flex-row justify-between">
          {title && <p className="font-bold">{title}</p>}
          <div onClick={handleClickClose}>{closeContent}</div>
        </div>
        {description && <p className="text-md">{description}</p>}
      </div>
    );
  },
);

CommonToast.displayName = 'CommonToast';
const MemoizedCommonToast = memo(CommonToast);

export type { CommonToastProps };
export { MemoizedCommonToast as default };
