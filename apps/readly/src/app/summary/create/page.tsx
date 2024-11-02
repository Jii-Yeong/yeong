'use client';

import SearchBookSection from '@/components/book/SearchBookSection/SearchBookSection';
import { COLORS } from '@/constants/color.constants';
import { SearchBookItem } from '@/model/book/book.dto';
import { createBookSummaryMutation } from '@/service/book.service';
import { Editor } from '@tinymce/tinymce-react';
import { CommonButton, CommonInput } from '@yeong/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [content, setContent] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<SearchBookItem | null>(null);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const { mutateAsync, isPending } = createBookSummaryMutation();
  const router = useRouter();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const clickEndButton = async () => {
    if (!content || !selectedBook) return;
    await mutateAsync({
      content,
      bookInfo: selectedBook,
      startPage,
      endPage,
    });
    router.push('/');
  };

  return (
    <div className="flex flex-col gap-y-[16px]">
      <h1 className="text-lg font-bold">읽은 책</h1>
      <SearchBookSection clickSelect={setSelectedBook} />
      <h1 className="text-lg font-bold">요약</h1>
      <Editor
        id="tiny-mce-editor"
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onEditorChange={handleEditorChange}
      />
      <h1 className="text-lg font-bold">쪽수</h1>
      <div className="flex flex-row items-center gap-x-[8px]">
        <CommonInput setInputValue={setStartPage} type="number" width={70} />
        <p>~</p>
        <CommonInput setInputValue={setEndPage} type="number" width={70} />
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
