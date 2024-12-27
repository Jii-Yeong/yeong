'use client';

import BookSummaryList from '@/components/book/BookSummaryList/BookSummaryList';
import { searchTypeList } from '@/components/book/SearchBookSummary/SearchBookSummary';
import { getSearchBookSummaryListQuery } from '@/service/book.service';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const type = useMemo(
    () => searchParams.get('type') || 'title',
    [searchParams],
  );
  const keyword = useMemo(
    () => searchParams.get('keyword') || '',
    [searchParams],
  );
  const typeLabel = useMemo(
    () => searchTypeList.find((item) => item.value === type)?.children,
    [type],
  );

  const { data, isFetching, fetchNextPage } = getSearchBookSummaryListQuery({
    type,
    keyword,
  });

  return (
    <div className="flex flex-col gap-y-[16px]">
      <p className="text-lg font-bold">
        "{keyword}" 의 {typeLabel} 검색 결과
      </p>
      <BookSummaryList
        data={data?.pages.flatMap((item) => item.data) || null}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
