import { userProfileSelector } from "@/recoil/user/user-selectors"
import { updateUserProfileService } from "@/service/user/profile.service"
import { ChangeEvent, useState } from "react"
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil"

export const useUserProfile = () => {
  const [userName, setUserName] = useState("")
  const [isEditUserName, setIsEditUserName] = useState(false)
  const [isEditImage, setIsEditImage] = useState(false)
  const user = useRecoilValue(userProfileSelector)
  const refresher = useRecoilRefresher_UNSTABLE(userProfileSelector)

  const handleClickEditImageButton = () => {
    setIsEditImage(true)
  }

  const handleClickCancelEditImageButton = () => {
    setIsEditImage(false)
  }

  const handleChangeUserName = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    setUserName(element.value)
  }

  const handleClickEditNameButton = () => {
    setIsEditUserName(true)
  }

  const handleClickCancelEditNameButton = () => {
    setIsEditUserName(false)
  }

  const handleClickEditUserName = async () => {
    if (!user) return

    await updateUserProfileService(user.id, {
      user_name: userName,
    })
    refresher()
    setIsEditUserName(false)
  }

  const handleChangeFileInputValue = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement
    const reader = new FileReader()
    if (!element.files || !element.files[0]) return
    if (!user) return

    reader.readAsDataURL(element.files[0])
    reader.onload = async () => {
      await updateUserProfileService(user.id, {
        user_image: String(reader.result),
      })
      refresher()
      setIsEditImage(false)
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }

  return {
    user,
    userName,
    isEditImage,
    isEditUserName,
    handleClickEditImageButton,
    handleClickCancelEditImageButton,
    handleChangeFileInputValue,
    handleChangeUserName,
    handleClickEditNameButton,
    handleClickCancelEditNameButton,
    handleClickEditUserName,
  }
}
