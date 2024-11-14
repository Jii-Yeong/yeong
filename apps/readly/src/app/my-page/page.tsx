'use client';

import BookSummaryItem from '@/components/book/BookSummaryItem/BookSummaryItem';
import BookSummaryListSkeleton from '@/components/skeleton/book/BookSummaryListSkeleton';
import { COLORS } from '@/constants/color.constants';
import { getBookSummaryMyListQuery } from '@/service/book.service';
import {
  editUserNicknameMutation,
  editUserProfileImageMutation,
  getUserInfoQuery,
} from '@/service/user.service';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  CommonButton,
  CommonFileInput,
  CommonInput,
  ProfileImage,
} from '@yeong/ui';
import { useState } from 'react';

export default function MyPage() {
  const [nickname, setNickname] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpenNicknameInput, setIsOpenNicknameInput] = useState(false);
  const [isOpenFileInput, setIsOpenFileInput] = useState(false);

  const { data: infoData } = getUserInfoQuery();
  const { data: myListData, isLoading: listLoading } =
    getBookSummaryMyListQuery();
  const { mutate: nicknameMutate } = editUserNicknameMutation();
  const { mutate: imageMutate } = editUserProfileImageMutation();

  const clickEditNicknameButton = () => {
    setIsOpenNicknameInput(!isOpenNicknameInput);
  };

  const clickEditFileButton = () => {
    setIsOpenFileInput(!isOpenFileInput);
  };

  const clickEnterEditNickname = () => {
    nicknameMutate({ nickname });
  };

  const clickEnterEditProfile = () => {
    if (!files) return;

    const image = files[0];

    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    imageMutate(formData);
  };

  return (
    <div className="flex flex-col items-center gap-y-[16px]">
      <div className="flex flex-row items-end">
        <ProfileImage imageSrc={infoData?.profile_image} size={150} />
        <CommonButton
          className="rounded-full w-[24px] h-[24px] p-0"
          classList={[
            isOpenNicknameInput && 'bg-main',
            isOpenNicknameInput && 'border-transparent',
          ]}
          leftIcon={
            <Icon
              icon="mingcute:pencil-fill"
              color={isOpenNicknameInput ? COLORS.white : COLORS.black}
            />
          }
          onClick={clickEditFileButton}
        />
      </div>
      {isOpenFileInput && (
        <div className="flex flex-row gap-x-[16px]">
          <CommonFileInput onChange={setFiles} />
          <CommonButton text="수정" onClick={clickEnterEditProfile} />
        </div>
      )}

      <div className="flex flex-col items-center gap-y-[16px]">
        <div className="flex flex-row gap-x-[8px] items-center">
          <p className="text-lg">{infoData?.nickname}</p>
          <CommonButton
            className="rounded-full w-[24px] h-[24px] p-0"
            classList={[
              isOpenNicknameInput && 'bg-main',
              isOpenNicknameInput && 'border-transparent',
            ]}
            leftIcon={
              <Icon
                icon="mingcute:pencil-fill"
                color={isOpenNicknameInput ? COLORS.white : COLORS.black}
              />
            }
            onClick={clickEditNicknameButton}
          />
        </div>
        {isOpenNicknameInput && (
          <div className="flex flex-row gap-x-[16px]">
            <CommonInput
              wrapperClassName="flex-1"
              placeholder="수정할 닉네임"
              setInputValue={setNickname}
            />
            <CommonButton text="수정" onClick={clickEnterEditNickname} />
          </div>
        )}
      </div>
      <p className="text-base">{infoData?.email}</p>
      <div className="w-full">
        <h1 className="text-lg mb-[16px]">작성글</h1>
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-x-[16px] gap-y-[16px] w-full">
          {listLoading && <BookSummaryListSkeleton />}
          {myListData &&
            myListData.map((item, index) => (
              <BookSummaryItem
                {...item}
                key={`${JSON.stringify(item)}-${index}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
