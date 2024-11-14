import BookSummaryList from '@/components/book/BookSummaryList/BookSummaryList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Suspense>
        <BookSummaryList />
      </Suspense>
    </div>
  );
}
