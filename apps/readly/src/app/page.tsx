'use client';

import BookRankList from '@/components/book/BookRankList/BookRankList';
import BookSummaryList from '@/components/book/BookSummaryList/BookSummaryList';
import { CommonDivider } from '@yeong/ui';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <div className="flex flex-col gap-y-[32px]">
        <BookRankList />
        <CommonDivider />
        <BookSummaryList />
      </div>
    </Suspense>
  );
}
