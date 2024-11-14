'use client';

import {
  getBookCategoryListQuery,
  getBoookSummaryListQuery,
} from '@/service/book.service';
import BookSummaryListSkeleton from '../../skeleton/book/BookSummaryListSkeleton';
import BookSummaryItem from '../BookSummaryItem/BookSummaryItem';
import { CommonChip } from '@yeong/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function BookSummaryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category_id');
  const {
    data: listData,
    isLoading,
    refetch,
  } = getBoookSummaryListQuery({
    categoryId: categoryId ? Number(categoryId) : null,
  });
  const { data: categoryData } = getBookCategoryListQuery();
  const currentParams = new URLSearchParams(searchParams.toString());

  const clickAllCategoryChip = () => {
    currentParams.delete('category_id');
    router.push(`?${currentParams.toString()}`);
  };

  const clickCategoryChip = (value: string) => {
    currentParams.set('category_id', value);
    router.push(`?${currentParams.toString()}`);
  };

  useEffect(() => {
    refetch();
  }, [categoryId]);

  return (
    <div>
      <div className="flex flex-row gap-x-[8px] gap-y-[8px] flex-wrap mb-[16px]">
        <CommonChip
          text="전체"
          onClick={clickAllCategoryChip}
          isActive={!Boolean(categoryId)}
        />
        {categoryData &&
          categoryData.map((item) => (
            <CommonChip
              text={`${item.name} ${item.summary_count}`}
              value={String(item.id)}
              onClick={clickCategoryChip}
              key={item.id}
              isActive={Number(categoryId) === item.id}
              disabled={item.summary_count <= 0}
            />
          ))}
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-x-[16px] gap-y-[16px] w-full">
        {isLoading && <BookSummaryListSkeleton />}

        {listData &&
          listData.map((item, index) => (
            <BookSummaryItem
              {...item}
              key={`${JSON.stringify(item)}-${index}`}
            />
          ))}
      </div>
    </div>
  );
}
