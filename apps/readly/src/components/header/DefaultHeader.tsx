'use client';

import { getUserMyInfoQuery } from '@/service/user.service';
import {
  getLoginPage,
  getSignUpPage,
  getSummaryCreatePage,
} from '@/utils/route.utils';
import { CommonButton, ProfileImage } from '@yeong/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DefaultHeader() {
  const { data } = getUserMyInfoQuery();
  const router = useRouter();

  const clickLoginButton = () => {
    router.push(getLoginPage());
  };

  const goToWriteSummary = () => {
    router.push(getSummaryCreatePage());
  };

  const clickSignUpButton = () => {
    router.push(getSignUpPage());
  };

  return (
    <div className="bg-main w-full h-[56px] px-[8px] flex flex-row justify-between items-center">
      <Link
        href="/"
        className="text-white text-[24px] md:text-[32px] font-bold"
      >
        READLY
      </Link>
      <div className="flex flex-row gap-x-2">
        {data ? (
          <div className="flex flex-row gap-x-[16px]">
            <Link
              href="/my-page"
              className="flex flex-row items-center gap-x-[8px]"
            >
              <ProfileImage imageSrc={data.profile_image} />
              <p className="text-white text-[16px] font-bold">
                {data.nickname}
              </p>
            </Link>
            <CommonButton text="요약 작성하기" clickButton={goToWriteSummary} />
          </div>
        ) : (
          <>
            <CommonButton text="로그인" clickButton={clickLoginButton} />
            <CommonButton text="회원가입" clickButton={clickSignUpButton} />
          </>
        )}
      </div>
    </div>
  );
}
