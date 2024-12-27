'use client';

import BookRankList from '@/components/book/BookRankList/BookRankList';
import BookSummaryList from '@/components/book/BookSummaryList/BookSummaryList';
import SearchBookSummary from '@/components/book/SearchBookSummary/SearchBookSummary';
import { getBookSummaryListQuery } from '@/service/book.service';
import {
  CommonDivider,
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
  CommonDropdownItemProps,
} from '@yeong/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function Home() {
  const orderList: CommonDropdownItemProps[] = [
    {
      value: 'desc',
      children: '최신순',
    },
    {
      value: 'asc',
      children: '등록순',
    },
    {
      value: 'view',
      children: '조회순',
    },
    {
      value: 'like',
      children: '좋아요순',
    },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = useMemo(
    () => searchParams.get('category_id'),
    [searchParams],
  );
  const order = useMemo(
    () => searchParams.get('order') || 'desc',
    [searchParams],
  );
  const dropdownLabel = useMemo(
    () => orderList.find((item) => item.value === order)?.children || '최신순',
    [order],
  );

  const {
    data: listData,
    isFetching: listFetching,
    fetchNextPage,
  } = getBookSummaryListQuery({
    category_id: categoryId ? Number(categoryId) : null,
    order,
    limit: 16,
  });

  const currentParams = new URLSearchParams(searchParams.toString());

  const changeOrderValue = (value: string) => {
    currentParams.set('order', value);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-y-[32px]">
      <BookRankList />
      <CommonDivider />
      <div className="flex flex-col gap-y-[16px]">
        <div className="w-full flex flex-row justify-between">
          <p className="text-lg font-bold mb-[16px]">책 요약</p>
          <CommonDropdown
            value={order}
            onChange={changeOrderValue}
            label={dropdownLabel}
          >
            <CommonDropdownInner>
              {orderList.map((item) => (
                <CommonDropdownItem
                  children={item.children}
                  value={item.value}
                  key={item.value}
                />
              ))}
            </CommonDropdownInner>
          </CommonDropdown>
        </div>
        <SearchBookSummary />

        <BookSummaryList
          data={listData?.pages.flatMap((item) => item.data) || null}
          isFetching={listFetching}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}
