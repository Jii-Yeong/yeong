import {usePost} from '@/hooks/usePost';
import {CategoryId} from '@/types/category.types';
import {Icon} from '@iconify/react/dist/iconify.js';
import {CommonButton, CommonDivider, ProfileImage} from '@yeong/ui';
import {cva} from 'class-variance-authority';
import {useRouter, useSearchParams} from 'next/navigation';
import {useMemo} from 'react';

type DefaultSidebarProps = {
  isShow?: boolean;
  onClickClose: () => void;
};

const sidebarVariants = cva(
  [
    'fixed',
    'w-full',
    'sm:w-[300px]',
    'h-screen',
    'bg-white',
    'p-[16px]',
    'transition-all',
    'shadow-lg',
    'flex',
    'flex-col',
    'gap-y-[16px]',
    'z-10',
  ],
  {
    variants: {
      isShow: {
        true: ['left-0'],
        false: ['left-[-100%]', 'sm:left-[-300px]'],
      },
    },
  },
);

const sidebarItemVariants = cva(
  [
    'flex',
    'flex-row',
    'justify-between',
    'cursor-pointer',
    'text-[18px]',
    'py-[8px]',
    'px-[16px]',
    'rounded-[8px]',
    'transition',
  ],
  {
    variants: {
      isCurrent: {
        true: ['bg-main', 'text-white'],
        false: ['bg-white', 'text-black', 'md:hover:bg-light-gray'],
      },
    },
    defaultVariants: {
      isCurrent: false,
    },
  },
);

export default function DefaultSidebar({
  isShow,
  onClickClose,
}: DefaultSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const {categoryList, categoryId} = usePost();

  const handleClickCategoryItem = (value: CategoryId) => {
    if (!value) {
      currentParams.delete('category');
    } else {
      currentParams.set('category', value);
    }
    router.push(`/?${currentParams.toString()}`);
    onClickClose();
  };

  const handleClickGithubButton = () => {
    window.open('https://github.com/Jii-Yeong', '_blank');
  };

  const handleClickNotionButton = () => {
    window.open(
      'https://jazzy-chanter-d66.notion.site/cb9a128e18254e878159b6a65b1cfe1e',
      '_blank',
    );
  };

  const sidebarClassName = useMemo(() => sidebarVariants({isShow}), [isShow]);

  return (
    <div className={sidebarClassName}>
      <div className="w-full flex flex-row justify-end">
        <CommonButton
          variant="ghost"
          onClick={onClickClose}
          className="p-[4px]">
          <Icon
            icon="eva:menu-arrow-outline"
            width={35}
            className="cursor-pointer"
          />
        </CommonButton>
      </div>
      <div className="flex flex-col items-center gap-y-[8px]">
        <ProfileImage size="large" imageSrc="/images/profile-image.png" />
        <p className="text-lg text-black">지영</p>
        <div className="flex flex-row gap-x-[8px] justify-center">
          <CommonButton
            className="rounded-full p-[4px]"
            variant="outline"
            onClick={handleClickNotionButton}>
            <Icon icon="mingcute:notion-fill" width={32} />
          </CommonButton>
          <CommonButton
            className="rounded-full p-[4px]"
            variant="outline"
            onClick={handleClickGithubButton}>
            <Icon icon="mdi:github" width={32} />
          </CommonButton>
        </div>
      </div>
      <div className="flex flex-col gap-y-[8px]">
        {categoryList.map((item) => (
          <div key={item.value}>
            <div
              className={sidebarItemVariants({
                isCurrent: item.value === categoryId,
              })}
              onClick={() => handleClickCategoryItem(item.value)}>
              <p>{item.label}</p>
              <p>{item.count}</p>
            </div>
            {item.value === null && <CommonDivider className="my-[16px]" />}
          </div>
        ))}
      </div>
    </div>
  );
}
