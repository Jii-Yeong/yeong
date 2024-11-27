import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, memo, useMemo } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { cn } from '../../../utils/class-name.utils.ts';

const profileImageWrapperVariants = cva(
  [
    'relative',
    'rounded-full',
    'overflow-hidden',
    'border',
    'border-gray',
    'bg-white',
    'flex',
    'flex-row',
    'justify-center',
    'items-center',
  ],
  {
    variants: {
      size: {
        small: ['w-[32px]', 'h-[32px]', 'min-w-[32px]', 'min-h-[32px]'],
        medium: ['w-[50px]', 'h-[50px]', 'min-w-[50px]', 'min-h-[50px]'],
        large: ['w-[80px]', 'h-[80px]', 'min-w-[80px]', 'min-h-[80px]'],
        xLarge: ['w-[120px]', 'h-[120px]', 'min-w-[120px]', 'min-h-[120px]'],
      },
    },
    defaultVariants: {
      size: 'small',
    },
  },
);

type ProfileImageWrapperVariant = VariantProps<
  typeof profileImageWrapperVariants
>;

type ProfileImageProps = {
  imageSrc?: string;
  size?: ProfileImageWrapperVariant['size'];
  className?: ClassNameValue;
};

const ProfileImage = forwardRef(
  ({ imageSrc, size, className }: ProfileImageProps) => {
    const defaultImage =
      'https://4rwpwj6q9lf5hlkz.public.blob.vercel-storage.com/common/images/default-profile-image-66IPBxnoDBpj8MMfqGw5hh6BM00rm6.png';

    const divClassName = useMemo(
      () => cn(profileImageWrapperVariants({ size }), className),
      [size, className],
    );
    return (
      <div className={divClassName}>
        <img
          src={imageSrc || defaultImage}
          alt="profile-image"
          className="w-full"
        />
      </div>
    );
  },
);

ProfileImage.displayName = 'ProfileImage';

const MemoizedProfileImage = memo(ProfileImage);

export { MemoizedProfileImage as default, profileImageWrapperVariants };
export type { ProfileImageProps, ProfileImageWrapperVariant };
