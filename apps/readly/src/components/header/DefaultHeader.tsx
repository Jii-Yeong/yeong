'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { loginByGoogleMutation } from '@/service/auth.service'
import ProfileImage from '../ui/image/ProfileImage/ProfileImage'
import { getUserInfoQuery } from '@/service/user.service'
import Link from 'next/link'
import { CommonButton } from '@yeong/ui'

export default function DefaultHeader() {
  const mutation = loginByGoogleMutation()
  const { data } = getUserInfoQuery()
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      mutation.mutate(tokenResponse.code)
    },
    flow: 'auth-code',
  })

  return (
    <div className="bg-main w-full h-[56px] px-[8px] flex flex-row justify-between items-center">
      <h1 className="text-white text-[32px] font-bold">READLY</h1>
      <div className="flex flex-row gap-x-2">
        {data ? (
          <Link
            href="/my-page"
            className="flex flex-row items-center gap-x-[8px]">
            <ProfileImage imageSrc={data.profile_image} />
            <p className="text-white text-[16px] font-bold">{data.nickname}</p>
          </Link>
        ) : (
          <>
            <CommonButton text="로그인" clickButton={loginGoogle} />
            <CommonButton text="회원가입" />
          </>
        )}
      </div>
    </div>
  )
}
