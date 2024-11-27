'use client';

import BookSummaryItem from '@/components/book/BookSummaryItem/BookSummaryItem';
import BookSummaryListSkeleton from '@/components/skeleton/book/BookSummaryListSkeleton';
import MyPageProfileSkeleton from '@/components/skeleton/my-page/MyPageProfileSkeleton';
import { COLORS } from '@/constants/color.constants';
import { getBookSummaryListQuery } from '@/service/book.service';
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
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function MyPage() {
  const { id } = useParams();
  const [nickname, setNickname] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpenNicknameInput, setIsOpenNicknameInput] = useState(false);
  const [isOpenFileInput, setIsOpenFileInput] = useState(false);

  const { data: infoData, isFetching: infoFetching } = getUserInfoQuery(
    String(id),
  );
  const { data: myListData, isLoading: listLoading } = getBookSummaryListQuery({
    user_id: String(id),
  });
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
      {infoFetching && <MyPageProfileSkeleton />}
      {!infoFetching && infoData && (
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-row items-end relative mb-[16px]">
            <ProfileImage imageSrc={infoData?.profile_image} size="xLarge" />
            {infoData?.is_my && (
              <CommonButton
                className={[
                  'rounded-full w-[24px] h-[24px] p-0 absolute right-[-16px]',
                  isOpenFileInput && 'bg-main',
                  isOpenFileInput && 'border-transparent',
                ]}
                onClick={clickEditFileButton}
                variant="outline"
              >
                <Icon
                  icon="mingcute:pencil-fill"
                  color={isOpenFileInput ? COLORS.white : COLORS.black}
                />
              </CommonButton>
            )}
          </div>
          {isOpenFileInput && (
            <div className="flex flex-row gap-x-[16px]">
              <CommonFileInput value={files} onChangeValue={setFiles} />
              <CommonButton onClick={clickEnterEditProfile}>수정</CommonButton>
            </div>
          )}

          <div className="flex flex-col items-center gap-y-[16px] relative">
            <div className="flex flex-row gap-x-[8px] items-center">
              <p className="text-lg">{infoData?.nickname}</p>
              {infoData?.is_my && (
                <CommonButton
                  className={[
                    'rounded-full w-[24px] h-[24px] p-0 absolute right-[-32px] bottom-0',
                    isOpenNicknameInput && 'bg-main',
                    isOpenNicknameInput && 'border-transparent',
                  ]}
                  variant="outline"
                  onClick={clickEditNicknameButton}
                >
                  <Icon
                    icon="mingcute:pencil-fill"
                    color={isOpenNicknameInput ? COLORS.white : COLORS.black}
                  />
                </CommonButton>
              )}
            </div>
          </div>
          {isOpenNicknameInput && (
            <div className="flex flex-row gap-x-[16px] mt-[16px]">
              <CommonInput
                className="flex-1"
                placeholder="수정할 닉네임"
                onChangeValue={setNickname}
              />
              <CommonButton onClick={clickEnterEditNickname}>수정</CommonButton>
            </div>
          )}
        </div>
      )}

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
