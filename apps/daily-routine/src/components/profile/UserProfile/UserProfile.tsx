import defaultProfileImage from "@/assets/images/profiles/default-profile-image.png"
import DefaultButton from "@/components/button/DefaultButton/DefaultButton.tsx"
import { userProfileSelector } from "@/recoil/user/user-selectors.ts"
import { singOutForSite } from "@/supabase/auth"
import { getMyPage, getRootPage } from "@/utils/page.utils"
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import "./UserProfile.scoped.scss"

export default function UserProfile() {
  const userProfile = useRecoilValue(userProfileSelector)

  const navigate = useNavigate()

  const clickMyPageButton = () => {
    navigate(getMyPage())
  }

  const clickSignOut = async () => {
    await singOutForSite()
    navigate(getRootPage())
  }

  return (
    <div className="user-profile">
      <div className="user-profile-area">
        <div className="user-information">
          {userProfile?.user_image ? (
            <img
              className="user-image"
              src={userProfile.user_image}
              alt="user-image"
            />
          ) : (
            <img
              className="user-image"
              src={defaultProfileImage}
              alt="default-user-image"
            />
          )}
        </div>
        <p className="user-name">{userProfile?.user_name}</p>
      </div>
      <div className="profile-button">
        <DefaultButton text="마이페이지" onClickButton={clickMyPageButton} />
        <DefaultButton text="로그아웃" onClickButton={clickSignOut} />
      </div>
    </div>
  )
}
