import { getMyPage } from '@/utils/route.utils';
import { ProfileImage } from '@yeong/ui';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

type UserProfileProps = {
  userImage: string;
  userName: string;
  userId: string;
};

export default function UserProfile({
  userImage,
  userName,
  userId,
}: UserProfileProps) {
  const router = useRouter();

  const handleClickUserProfile = (e: MouseEvent) => {
    e.preventDefault();
    router.push(getMyPage(userId));
  };
  return (
    <div
      className="flex flex-row gap-x-[8px] items-center justify-end cursor-pointer hover:opacity-60"
      onClick={handleClickUserProfile}
    >
      <ProfileImage imageSrc={userImage} />
      <p className="text-md">{userName}</p>
    </div>
  );
}
