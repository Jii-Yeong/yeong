import { useUserProfile } from '@/hooks/user/useUserProfile';
import './MyPageSidebar.scoped.scss';
import {
  CommonButton,
  CommonFileInput,
  CommonInput,
  ProfileImage,
} from '@yeong/ui';

export default function MyPageSidebar() {
  const {
    user,
    isEditImage,
    isEditUserName,
    userName,
    userImage,
    handleChangeFileInputValue,
    handleClickCancelEditImageButton,
    handleClickEditImageButton,
    handleChangeUserName,
    handleClickCancelEditNameButton,
    handleClickEditNameButton,
    handleClickEditUserName,
  } = useUserProfile();

  return (
    <div className="my-page-sidebar">
      <div className="user-image-area">
        <ProfileImage
          imageSrc={user?.user_image}
          size="xLarge"
          className="w-[150px] h-[150px]"
        />
        {isEditImage ? (
          <div className="file-input-area flex flex-row gap-x-[8px]">
            <CommonFileInput
              value={userImage}
              onChangeValue={handleChangeFileInputValue}
            />
            <CommonButton
              variant="outline"
              onClick={handleClickCancelEditImageButton}
            >
              취소
            </CommonButton>
          </div>
        ) : (
          <CommonButton variant="outline" onClick={handleClickEditImageButton}>
            유저 이미지 수정
          </CommonButton>
        )}
      </div>
      <div className="user-name-area">
        {!isEditUserName ? (
          <>
            <div className="user-name-inner">
              <p className="user-name">{user?.user_name}</p>
              <div className="edit-user-name-button">
                <CommonButton
                  variant="outline"
                  onClick={handleClickEditNameButton}
                >
                  수정
                </CommonButton>
              </div>
            </div>
          </>
        ) : (
          <div className="edit-user-name">
            <div className="edit-input-area">
              <CommonInput
                value={userName}
                onChangeValue={handleChangeUserName}
              />
            </div>

            <CommonButton variant="outline" onClick={handleClickEditUserName}>
              완료
            </CommonButton>
            <CommonButton
              variant="outline"
              onClick={handleClickCancelEditNameButton}
            >
              취소
            </CommonButton>
          </div>
        )}
      </div>
    </div>
  );
}
