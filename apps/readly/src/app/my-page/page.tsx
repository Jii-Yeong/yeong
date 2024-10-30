'use client'

import ProfileImage from '@/components/ui/image/ProfileImage/ProfileImage'
import { getUserInfoQuery } from '@/service/user.service'

export default function MyPage() {
  const { data } = getUserInfoQuery()
  return (
    <div className="flex flex-col items-center gap-y-[16px]">
      <ProfileImage imageSrc={data?.profile_image} size={150} />
      <p className="text-lg">{data?.nickname}</p>
      <p className="text-base">{data?.email}</p>
    </div>
  )
}
