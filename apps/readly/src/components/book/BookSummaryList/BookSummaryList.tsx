import { useObserverTarget } from '@/hooks/useObserverTarget';
import { getBookSummaryListQuery } from '@/service/book.service';
import {
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
  CommonDropdownItemProps,
} from '@yeong/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import BookSummaryListSkeleton from '../../skeleton/book/BookSummaryListSkeleton';
import BookSummaryItem from '../BookSummaryItem/BookSummaryItem';
import SearchBookSummary from '../SearchBookSummary/SearchBookSummary';

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

  const { observerTarget } = useObserverTarget({ callback: fetchNextPage });

  return (
    <div className="flex flex-col gap-y-[16px]">
      <p className="text-lg font-bold mb-[16px]">책 요약</p>
      <SearchBookSummary />
      <div className="w-full mb-[16px]">
        <div className="float-right">
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
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-x-[16px] gap-y-[16px] w-full">
        {listData && !listFetching ? (
          listData.pages.flatMap(({ data }, index) =>
            data.map((item) => (
              <BookSummaryItem
                {...item}
                key={`${JSON.stringify(item)}-${index}`}
              />
            )),
          )
        ) : (
          <BookSummaryListSkeleton />
        )}
      </div>
      {observerTarget()}
    </div>
  );
}
