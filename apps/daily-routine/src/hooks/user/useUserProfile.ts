import { userProfileSelector } from '@/recoil/user/user-selectors';
import { updateUserProfileService } from '@/service/user/profile.service';
import { useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

export const useUserProfile = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState<FileList | null>(null);
  const [isEditUserName, setIsEditUserName] = useState(false);
  const [isEditImage, setIsEditImage] = useState(false);
  const user = useRecoilValue(userProfileSelector);
  const refresher = useRecoilRefresher_UNSTABLE(userProfileSelector);

  const handleClickEditImageButton = () => {
    setIsEditImage(true);
  };

  const handleClickCancelEditImageButton = () => {
    setIsEditImage(false);
  };

  const handleChangeUserName = (value: string) => {
    setUserName(value);
  };

  const handleClickEditNameButton = () => {
    setIsEditUserName(true);
  };

  const handleClickCancelEditNameButton = () => {
    setIsEditUserName(false);
  };

  const handleClickEditUserName = async () => {
    if (!user) return;

    await updateUserProfileService(user.id, {
      user_name: userName,
    });
    refresher();
    setIsEditUserName(false);
  };

  const handleChangeFileInputValue = (files: FileList | null) => {
    setUserImage(files);
    const reader = new FileReader();
    if (!user || !files) return;

    reader.readAsDataURL(files[0]);
    reader.onload = async () => {
      await updateUserProfileService(user.id, {
        user_image: String(reader.result),
      });
      refresher();
      setIsEditImage(false);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  return {
    user,
    userName,
    userImage,
    isEditImage,
    isEditUserName,
    handleClickEditImageButton,
    handleClickCancelEditImageButton,
    handleChangeFileInputValue,
    handleChangeUserName,
    handleClickEditNameButton,
    handleClickCancelEditNameButton,
    handleClickEditUserName,
  };
};
