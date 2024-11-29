'use client';

import DefaultSidebar from '@/components/sidebar/DefaultSidebar';
import {COLORS} from '@/constants/colors.constants';
import {Icon} from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import {useState} from 'react';

export default function CommonHeader() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const clickMenuButton = () => {
    setIsShowSidebar(true);
  };

  const clickCloseButton = () => {
    setIsShowSidebar(false);
  };
  return (
    <>
      <div className="w-full bg-[#cac3f8b3] h-[60px] flex flex-row justify-between items-center px-[16px] fixed">
        <Icon
          icon="icon-park-outline:menu-unfold"
          color={COLORS.white}
          width={35}
          className="cursor-pointer z-100"
          onClick={clickMenuButton}
        />
        <Link href="/" className="text-[24px] text-[#FFFFFF] font-bold">
          끄적끄적
        </Link>
      </div>
      <DefaultSidebar isShow={isShowSidebar} onClickClose={clickCloseButton} />
    </>
  );
}
