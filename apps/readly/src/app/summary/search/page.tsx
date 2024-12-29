'use client';

import BookSummaryList from '@/components/book/BookSummaryList/BookSummaryList';
import { searchTypeList } from '@/components/book/SearchBookSummary/SearchBookSummary';
import { getSearchBookSummaryListQuery } from '@/service/book.service';
import { CommonChip } from '@yeong/ui';
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

  const keywordElement = useMemo(() => {
    if (type === 'category') {
      const keywordList: string[] = JSON.parse(keyword);
      return (
        <div className="flex flex-row gap-x-[4px]">
          {keywordList.map((item) => (
            <CommonChip variant="secondary" isActive text={item} key={item} />
          ))}
        </div>
      );
    }

    return `"${keyword}"`;
  }, [keyword]);

  return (
    <div className="flex flex-col gap-y-[16px]">
      <div className="text-lg font-bold flex flex-row gap-x-[4px] items-center">
        {keywordElement}의 {typeLabel} 검색 결과
      </div>
      <BookSummaryList
        data={data?.pages.flatMap((item) => item.data) || null}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
