import { userProfileSelector } from '@/recoil/user/user-selectors.ts';
import { singOutForSite } from '@/supabase/auth';
import { getMyPage, getRootPage } from '@/utils/page.utils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import './UserProfile.scoped.scss';
import { CommonButton, ProfileImage } from '@yeong/ui';

export default function UserProfile() {
  const userProfile = useRecoilValue(userProfileSelector);

  const navigate = useNavigate();

  const clickMyPageButton = () => {
    navigate(getMyPage());
  };

  const clickSignOut = async () => {
    await singOutForSite();
    navigate(getRootPage());
  };

  return (
    <div className="user-profile">
      <div className="user-profile-area">
        <div className="user-information">
          <ProfileImage imageSrc={userProfile?.user_image} />
        </div>
        <p className="user-name">{userProfile?.user_name}</p>
      </div>
      <div className="profile-button">
        <CommonButton onClick={clickMyPageButton} variant="outline">
          마이페이지
        </CommonButton>
        <CommonButton onClick={clickSignOut} variant="outline">
          로그아웃
        </CommonButton>
      </div>
    </div>
  );
}
