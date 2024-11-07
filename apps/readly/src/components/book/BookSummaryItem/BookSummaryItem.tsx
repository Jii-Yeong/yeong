import { CommonDivider, EllipsisText, ProfileImage } from '@yeong/ui';
import { formatDateToString } from '@yeong/utils/date';
import Link from 'next/link';
import { useMemo } from 'react';
import BookSummaryContent from '../BookSummaryContent/BookSummaryContent';

export type BookSummaryItemProps = {
  id: number;
  content: string;
  bookTitle: string;
  bookAuthor: string;
  userImage: string;
  userName: string;
  startPage: number;
  endPage: number;
  createAt: string;
};

export default function BookSummaryItem({
  id,
  content,
  bookAuthor,
  bookTitle,
  userImage,
  userName,
  startPage,
  endPage,
  createAt,
}: BookSummaryItemProps) {
  const createAtFromFormat = useMemo(
    () => formatDateToString(new Date(createAt)),
    [createAt],
  );
  return (
    <Link
      href={`summary/detail/${id}`}
      className="w-full border border-gray border-solid rounded-[16px] p-[16px] flex flex-col"
    >
      <div className="bg-light-blue p-[8px] rounded-[8px] ">
        <div className="overflow-hidden h-[120px]">
          <BookSummaryContent content={content} />
        </div>
      </div>
      <CommonDivider className="my-[8px]" />
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <EllipsisText text={bookTitle} fontSize={14} />
            <p className="text-md text-dark-gray">{bookAuthor}</p>
          </div>
          <div className="flex flex-row gap-x-[4px] text-sm text-dark-gray">
            <p>{startPage}p</p>
            <p>~</p>
            <p>{endPage}p</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-[16px]">
          <div className="flex flex-row gap-x-[8px] items-center justify-end">
            <ProfileImage imageSrc={userImage} />
            <p className="text-md">{userName}</p>
          </div>
          <p className="text-dark-gray text-md">{createAtFromFormat}</p>
        </div>
      </div>
    </Link>
  );
}
