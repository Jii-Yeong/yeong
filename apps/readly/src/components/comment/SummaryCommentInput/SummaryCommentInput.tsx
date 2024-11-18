import { COLORS } from '@/constants/color.constants';
import { CommonButton, CommonTextarea } from '@yeong/ui';
import { useRef, useState } from 'react';

type SummaryCommentInputProps = {
  disabled?: boolean;
  isPending?: boolean;
  setCommentValue: (comment: string) => void;
  clickInputButton: () => Promise<void>;
};

export default function SummaryCommentInput({
  disabled,
  isPending,
  setCommentValue,
  clickInputButton,
}: SummaryCommentInputProps) {
  const [alertMessage, setAlertMessage] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const clickCommentInputButton = async () => {
    setAlertMessage('');

    if (!ref.current) return;

    if (!ref.current.value) {
      setAlertMessage('댓글을 입력해주세요.');
      return;
    }

    await clickInputButton();
  };
  return (
    <div className="flex flex-row gap-x-[16px] mb-[16px]">
      <CommonTextarea
        setTextareaValue={setCommentValue}
        height={100}
        style={{ flex: 1 }}
        ref={ref}
        placeholder={
          disabled
            ? '로그인 후 댓글 작성이 가능합니다.'
            : '댓글을 입력해주세요.'
        }
        disabled={disabled}
        alertText={alertMessage}
      />
      <CommonButton
        className="w-[90px] text-[16px] bg-main text-white border-transparent"
        onClick={clickCommentInputButton}
        isLoading={isPending}
        loadingColor={COLORS.white}
        disabled={disabled}
      >
        입력
      </CommonButton>
    </div>
  );
}
