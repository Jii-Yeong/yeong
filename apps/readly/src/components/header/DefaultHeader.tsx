'use client';

import { getUserMyInfoQuery } from '@/service/user.service';
import {
  getLoginPage,
  getSignUpPage,
  getSummaryCreatePage,
} from '@/utils/route.utils';
import { CommonButton } from '@yeong/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserProfile from '../user/UserProfile/UserProfile';

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
      <div className="flex flex-row gap-x-[8px]">
        {data ? (
          <>
            <UserProfile
              userId={data.id}
              userImage={data.profile_image}
              userName={data.nickname}
              textClassName="text-white font-bold"
            />
            <CommonButton onClick={goToWriteSummary} variant="outline">
              요약 작성하기
            </CommonButton>
          </>
        ) : (
          <>
            <CommonButton onClick={clickLoginButton} variant="outline">
              로그인
            </CommonButton>
            <CommonButton onClick={clickSignUpButton} variant="outline">
              회원가입
            </CommonButton>
          </>
        )}
      </div>
    </div>
  );
}
