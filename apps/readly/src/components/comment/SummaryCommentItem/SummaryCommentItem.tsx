import { COLORS } from '@/constants/color.constants';
import { useAuth } from '@/hooks/useAuth';
import { SummaryCommentItemModel } from '@/model/comment/comment.model';
import { CommonButton } from '@yeong/ui';
import { formatDateToString } from '@yeong/utils/date';
import { useMemo, useState } from 'react';
import SummaryCommentInput from '../SummaryCommentInput/SummaryCommentInput';
import UserProfile from '@/components/user/UserProfile/UserProfile';

export type SummaryCommentItemProps = SummaryCommentItemModel & {
  isReply?: boolean;
  isPending?: boolean;
  isDeletePending?: boolean;
  setCommentValue?: (comment: string) => void;
  clickInputButton?: (commentId?: number) => Promise<void>;
  clickDeleteButton?: (commentId: number) => void;
};

export default function SummaryCommentItem({
  comment,
  createdAt,
  userImage,
  userName,
  id,
  isMy,
  isReply,
  isPending,
  isDeletePending,
  userId,
  setCommentValue,
  clickInputButton,
  clickDeleteButton,
}: SummaryCommentItemProps) {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const replyButtonText = useMemo(
    () => (isOpenInput ? '닫기' : '답글 달기'),
    [isOpenInput],
  );
  const { isLoggedIn } = useAuth();

  const clickReplyButton = () => {
    setIsOpenInput(!isOpenInput);
  };

  const clickCommentDeleteButton = () => {
    if (!clickDeleteButton) return;
    clickDeleteButton(id);
  };
  return (
    <div className="flex flex-col gap-y-[16px] p-[16px]">
      <p className="text-md text-dark-gray">
        {formatDateToString(new Date(createdAt))}
      </p>
      <div className="whitespace-break-spaces	break-all">{comment}</div>
      <div className="flex flex-row gap-x-[16px]">
        <UserProfile
          userId={userId}
          userImage={userImage}
          userName={userName}
        />
        {isLoggedIn && !isReply && (
          <CommonButton
            text={replyButtonText}
            className="text-[12px]"
            clickButton={clickReplyButton}
          />
        )}
        {isMy && (
          <div className="flex flex-row gap-x-[8px]">
            {/* <CommonButton text="수정" fontSize={12} padding="2px 8px" /> */}
            <CommonButton
              text="삭제"
              className="text-[12px] text-white bg-red border-transparent px-[8px] py-[2px]"
              clickButton={clickCommentDeleteButton}
              isLoading={isDeletePending}
              disabled={isDeletePending}
              loadingColor={COLORS.white}
              loadingWidth={20}
            />
          </div>
        )}
      </div>
      {isOpenInput && setCommentValue && clickInputButton && (
        <SummaryCommentInput
          isPending={isPending}
          setCommentValue={setCommentValue}
          clickInputButton={() => clickInputButton(id)}
        />
      )}
    </div>
  );
}
