'use client';

import CommonPagination from '@/components/pagination/CommonPagination/CommonPagination';
import { SearchBookItem } from '@/model/book/book.dto';
import { searchBookMutation } from '@/service/book.service';
import { CommonButton, CommonInput } from '@yeong/ui';
import { useEffect, useReducer, useState } from 'react';
import BookItem from '../BookItem/BookItem';
import './SearchBookSection.scss';

type SearchBookSectionProps = {
  clickSelect: (item: SearchBookItem) => void;
};

export default function SearchBookSection({
  clickSelect,
}: SearchBookSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SearchBookItem | null>(null);
  const [alertText, setAlertText] = useState('');
  const { mutate, data: bookData } = searchBookMutation();
  const displayCount = 12;

  const reducer = (state: number, action: number) => {
    if (!action) return state;
    return Math.ceil(action / displayCount);
  };

  const [countState, dispatch] = useReducer(reducer, 0);

  const searchBook = () => {
    setAlertText('');
    if (!inputValue) {
      setAlertText('첵 제목을 입력해주세요.');
      return;
    }
    if (inputValue.length < 2) {
      setAlertText('두 글자 이상을 입력해주세요.');
      return;
    }
    setIsOpenResult(true);
    mutate({ query: inputValue, display: String(displayCount) });
  };

  const clickPaginationButton = (pagination: number) => {
    mutate({
      query: inputValue,
      start: String(pagination * displayCount + 1),
      display: String(displayCount),
    });
  };

  const clickBookItem = (item: SearchBookItem) => {
    setSelectedBook(item);
  };

  const clickSelectBook = () => {
    if (!selectedBook) return;
    clickSelect(selectedBook);
    setIsOpenResult(false);
  };

  useEffect(() => {
    dispatch(bookData?.total || 0);
  }, [bookData?.total]);
  return (
    <div className="search-book-section flex flex-col items-center gap-y-[16px]">
      <div className="flex flex-row gap-x-[16px] w-full">
        <CommonInput
          setInputValue={setInputValue}
          style={{ flex: 1 }}
          pressEnter={searchBook}
          placeholder="책 제목을 2자 이상 입력해주세요."
          alertText={alertText}
        />
        <CommonButton text="검색" clickButton={searchBook} />
      </div>
      {isOpenResult && (
        <div className="flex flex-col items-center gap-y-[16px]">
          <CommonPagination
            totalCount={countState}
            clickButton={clickPaginationButton}
          />
          <div className="book-data-list">
            {bookData?.items &&
              bookData.items.map((item, index) => (
                <div key={`${JSON.stringify(item)}-${index}`}>
                  <BookItem
                    author={item.author}
                    image={item.image}
                    pubdate={item.pubdate}
                    publisher={item.publisher}
                    title={item.title}
                    isbn={item.isbn}
                    clickItem={() => clickBookItem(item)}
                    isSelected={item.isbn === selectedBook?.isbn}
                  />
                </div>
              ))}
          </div>
          {selectedBook && (
            <CommonButton text="선택" clickButton={clickSelectBook} />
          )}
        </div>
      )}
      {!isOpenResult && selectedBook && (
        <div className="w-full">
          <BookItem
            author={selectedBook.author}
            image={selectedBook.image}
            isbn={selectedBook.isbn}
            pubdate={selectedBook.pubdate}
            publisher={selectedBook.publisher}
            title={selectedBook.title}
            cursor="default"
            isWide
            imageWidth={100}
          />
        </div>
      )}
    </div>
  );
}
