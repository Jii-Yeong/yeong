'use client';

import SearchBookSection from '@/components/book/SearchBookSection/SearchBookSection';
import { COLORS } from '@/constants/color.constants';
import { SearchBookItem } from '@/model/book/book.dto';
import { createBookSummaryMutation } from '@/service/book.service';
import { Editor } from '@tinymce/tinymce-react';
import { CommonButton, CommonInput } from '@yeong/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BookSummaryCreateSection() {
  const [content, setContent] = useState('');
  const [selectedBook, setSelectedBook] = useState<SearchBookItem | null>(null);
  const [startPage, setStartPage] = useState('1');
  const [endPage, setEndPage] = useState('1');
  const [bookAlertMessage, setBookAlertMessage] = useState('');
  const [contentAlertMessage, setContentAlertMessage] = useState('');
  const { mutateAsync, isPending } = createBookSummaryMutation();
  const router = useRouter();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const clickEndButton = async () => {
    if (!selectedBook) {
      setBookAlertMessage('읽은 책을 선택하여야 합니다.');
      return;
    }
    if (!content) {
      setContentAlertMessage('요약 작성이 필요합니다.');
      return;
    }

    await mutateAsync({
      content,
      bookInfo: selectedBook,
      startPage,
      endPage,
    });
    router.push('/');
  };

  useEffect(() => {
    if (selectedBook) {
      setBookAlertMessage('');
    }
    if (content) {
      setContentAlertMessage('');
    }
  }, [selectedBook, content]);

  return (
    <div className="flex flex-col gap-y-[16px]">
      <h1 className="text-lg font-bold">읽은 책</h1>
      <SearchBookSection clickSelect={setSelectedBook} />
      {bookAlertMessage && (
        <p className="text-md text-red">{bookAlertMessage}</p>
      )}
      <h1 className="text-lg font-bold">요약</h1>
      <Editor
        id="tiny-mce-editor"
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onEditorChange={handleEditorChange}
      />
      {contentAlertMessage && (
        <p className="text-md text-red">{contentAlertMessage}</p>
      )}
      <h1 className="text-lg font-bold">쪽수</h1>
      <div className="flex flex-row items-center gap-x-[8px]">
        <CommonInput
          setInputValue={setStartPage}
          type="number"
          width={70}
          defaultValue="1"
        />
        <p>~</p>
        <CommonInput
          setInputValue={setEndPage}
          type="number"
          width={70}
          defaultValue="1"
        />
      </div>
      <CommonButton
        text="작성"
        clickButton={clickEndButton}
        fontSize={16}
        fontWeight="bold"
        backgroundColor={COLORS.main}
        color={COLORS.white}
        borderColor="transparent"
        padding="16px 10px"
        isLoading={isPending}
        loadingColor={COLORS.white}
      />
    </div>
  );
}
