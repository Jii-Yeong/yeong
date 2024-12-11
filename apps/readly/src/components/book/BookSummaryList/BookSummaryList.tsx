'use client';

import BookCategorySkeleton from '@/components/skeleton/book/BookCategorySkeleton';
import {
  getBookCategoryListQuery,
  getBookSummaryListQuery,
} from '@/service/book.service';
import {
  CommonChip,
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
  CommonDropdownItemProps,
} from '@yeong/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import BookSummaryListSkeleton from '../../skeleton/book/BookSummaryListSkeleton';
import BookCategoryChip from '../BookCategoryChip/BookCategoryChip';
import BookSummaryItem from '../BookSummaryItem/BookSummaryItem';

export default function BookSummaryList() {
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

  const { data: listData, isFetching: listFetching } = getBookSummaryListQuery({
    category_id: categoryId ? Number(categoryId) : null,
    order,
  });
  const { data: categoryData, isLoading: categoryLoading } =
    getBookCategoryListQuery();
  const currentParams = new URLSearchParams(searchParams.toString());

  const clickAllCategoryChip = () => {
    currentParams.delete('category_id');
    router.push(`?${currentParams.toString()}`);
  };

  const changeOrderValue = (value: string) => {
    currentParams.set('order', value);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-row gap-x-[8px] gap-y-[8px] flex-wrap mb-[16px]">
        {categoryLoading && <BookCategorySkeleton />}
        {categoryData && (
          <>
            <CommonChip
              text="전체"
              onClick={clickAllCategoryChip}
              isActive={!Boolean(categoryId)}
            />
            {categoryData.map((item) => (
              <BookCategoryChip
                text={`${item.name} ${item.summary_count}`}
                value={String(item.id)}
                key={item.id}
                isActive={Number(categoryId) === item.id}
                disabled={item.summary_count <= 0}
              />
            ))}
          </>
        )}
      </div>
      <div className="mb-[16px] float-right">
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
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-x-[16px] gap-y-[16px] w-full">
        {listData && !listFetching ? (
          listData.map((item, index) => (
            <BookSummaryItem
              {...item}
              key={`${JSON.stringify(item)}-${index}`}
            />
          ))
        ) : (
          <BookSummaryListSkeleton />
        )}
      </div>
    </div>
  );
}
