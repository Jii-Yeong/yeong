'use client';

import { getBoookSummaryListQuery } from '@/service/book.service';
import BookSummaryItem from '../BookSummaryItem/BookSummaryItem';
import BookSummaryListSkeleton from './BookSummaryListSkeleton';

export default function BookSummaryList() {
  const { data, isLoading } = getBoookSummaryListQuery();
  return (
    <div className="grid grid-cols-4 gap-x-[16px] gap-y-[16px]">
      {isLoading && <BookSummaryListSkeleton />}
      {data &&
        data.map((item, index) => (
          <BookSummaryItem {...item} key={`${JSON.stringify(item)}-${index}`} />
        ))}
    </div>
  );
}
