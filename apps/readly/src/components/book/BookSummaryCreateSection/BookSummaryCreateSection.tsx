'use client';

import SearchBookSection, {
  SearchBookType,
} from '@/components/book/SearchBookSection/SearchBookSection';
import { COLORS } from '@/constants/color.constants';
import {
  createBookSummaryMutation,
  editBookSummaryMutation,
  getBookCategoryListQuery,
} from '@/service/book.service';
import { Editor } from '@tinymce/tinymce-react';
import {
  CommonButton,
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
  CommonInput,
} from '@yeong/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type BookSummaryCreateSectionProps = {
  defaultBook?: SearchBookType | null;
  defaultContent?: string;
  defaultStartPage?: string;
  defaultEndPage?: string;
  defaultCategory?: string;
  defaultCategoryName?: string;
  isEdit?: boolean;
  summaryId?: string;
};

export default function BookSummaryCreateSection({
  defaultBook = null,
  defaultContent = '',
  defaultEndPage = '1',
  defaultStartPage = '1',
  defaultCategory = '',
  defaultCategoryName = '',
  isEdit,
  summaryId,
}: BookSummaryCreateSectionProps) {
  const [selectedBook, setSelectedBook] = useState<SearchBookType | null>(
    defaultBook,
  );
  const [categoryId, setCategoryId] = useState(defaultCategory);
  const [content, setContent] = useState(defaultContent);
  const [startPage, setStartPage] = useState(defaultStartPage);
  const [endPage, setEndPage] = useState(defaultEndPage);
  const [bookAlertMessage, setBookAlertMessage] = useState('');
  const [categoryAlertMessage, setCategoryAlertMessage] = useState('');
  const [contentAlertMessage, setContentAlertMessage] = useState('');
  const { mutateAsync: createMutate, isPending: isCreatePending } =
    createBookSummaryMutation();
  const { mutateAsync: editMutate, isPending: isEditPending } =
    editBookSummaryMutation();
  const router = useRouter();
  const { data: categoryData, isLoading: categoryLoading } =
    getBookCategoryListQuery();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const clickEndButton = async () => {
    if (!selectedBook) {
      setBookAlertMessage('읽은 책을 선택하여야 합니다.');
      return;
    }
    if (!categoryId) {
      setCategoryAlertMessage('카테고리를 선택하여야 합니다.');
      return;
    }
    if (!content) {
      setContentAlertMessage('요약 작성이 필요합니다.');
      return;
    }

    if (isEdit) {
      await editMutate({
        content,
        bookInfo: selectedBook,
        startPage,
        endPage,
        id: Number(summaryId),
        category_id: Number(categoryId),
      });
      router.push(`/summary/detail/${summaryId}`);
    } else {
      await createMutate({
        content,
        bookInfo: selectedBook,
        startPage,
        endPage,
        category_id: Number(categoryId),
      });
      router.push('/');
    }
  };

  useEffect(() => {
    if (selectedBook) {
      setBookAlertMessage('');
    }
    if (content) {
      setContentAlertMessage('');
    }
    if (categoryId) {
      setCategoryAlertMessage('');
    }
  }, [selectedBook, content]);

  return (
    <div className="flex flex-col gap-y-[16px]">
      <h1 className="text-lg font-bold">읽은 책</h1>
      <SearchBookSection
        clickSelect={setSelectedBook}
        defaultBook={defaultBook}
      />
      {bookAlertMessage && (
        <p className="text-md text-red">{bookAlertMessage}</p>
      )}
      <h1 className="text-lg font-bold">카테고리</h1>
      <CommonDropdown
        onChange={setCategoryId}
        className="w-full sm:w-[300px]"
        value={categoryId}
        label={defaultCategoryName}
        isLoading={categoryLoading}
      >
        {categoryData && (
          <CommonDropdownInner>
            <div className="grid grid-cols-2">
              {categoryData.map((item) => (
                <CommonDropdownItem
                  value={String(item.id)}
                  children={item.name}
                  key={item.id}
                />
              ))}
            </div>
          </CommonDropdownInner>
        )}
      </CommonDropdown>
      {categoryAlertMessage && (
        <p className="text-md text-red">{categoryAlertMessage}</p>
      )}
      <h1 className="text-lg font-bold">요약</h1>
      <Editor
        id="tiny-mce-editor"
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onEditorChange={handleEditorChange}
        value={content}
      />
      {contentAlertMessage && (
        <p className="text-md text-red">{contentAlertMessage}</p>
      )}
      <h1 className="text-lg font-bold">쪽수</h1>
      <div className="flex flex-row items-center gap-x-[8px]">
        <CommonInput
          setInputValue={setStartPage}
          type="number"
          defaultValue={defaultStartPage}
          wrapperClassName="w-[70px]"
        />
        <p>~</p>
        <CommonInput
          setInputValue={setEndPage}
          type="number"
          defaultValue={defaultEndPage}
          wrapperClassName="w-[70px]"
        />
      </div>
      <CommonButton
        text="작성"
        clickButton={clickEndButton}
        className="text-[16px] font-bold bg-main text-white border-transparent px-[10px] py-[16px]"
        isLoading={isCreatePending || isEditPending}
        loadingColor={COLORS.white}
      />
    </div>
  );
}
