import defaultImage from "@/assets/images/profiles/default-profile-image.png"
import DefaultButton from "@/components/button/DefaultButton/DefaultButton"
import DefaultInput from "@/components/input/DefaultInput/DefaultInput"
import FileInput from "@/components/input/FileInput/FileInput"
import { useUserProfile } from "@/hooks/user/useUserProfile"
import "./MyPageSidebar.scoped.scss"

export default function MyPageSidebar() {
  const {
    user,
    isEditImage,
    isEditUserName,
    userName,
    handleChangeFileInputValue,
    handleClickCancelEditImageButton,
    handleClickEditImageButton,
    handleChangeUserName,
    handleClickCancelEditNameButton,
    handleClickEditNameButton,
    handleClickEditUserName,
  } = useUserProfile()

  return (
    <div className="my-page-sidebar">
      <div className="user-image-area">
        {user?.user_image ? (
          <img className="user-image" src={user.user_image} alt="user-image" />
        ) : (
          <img
            className="user-image"
            src={defaultImage}
            alt="default-user-image"
          />
        )}
        {isEditImage ? (
          <div className="file-input-area">
            <FileInput setInputValue={handleChangeFileInputValue} />
            <DefaultButton
              text="취소"
              onClickButton={handleClickCancelEditImageButton}
            />
          </div>
        ) : (
          <DefaultButton
            text="유저 이미지 수정"
            onClickButton={handleClickEditImageButton}
          />
        )}
      </div>
      <div className="user-name-area">
        {!isEditUserName ? (
          <>
            <div className="user-name-inner">
              <p className="user-name">{user?.user_name}</p>
              <div className="edit-user-name-button">
                <DefaultButton
                  text="수정"
                  onClickButton={handleClickEditNameButton}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="edit-user-name">
            <div className="edit-input-area">
              <DefaultInput
                inputValue={userName}
                changeInput={handleChangeUserName}
              />
            </div>
            <DefaultButton
              text="완료"
              onClickButton={handleClickEditUserName}
            />
            <DefaultButton
              text="취소"
              onClickButton={handleClickCancelEditNameButton}
            />
          </div>
        )}
      </div>
    </div>
  )
}
