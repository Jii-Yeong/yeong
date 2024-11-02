'use client';

import BookItem from '@/components/book/BookItem/BookItem';
import BookSummaryContent from '@/components/book/BookSummaryContent/BookSummaryContent';
import { getDetailBookSummaryQuery } from '@/service/book.service';
import { useParams } from 'next/navigation';

export default function SummaryDetailPage() {
  const params = useParams();
  const { data } = getDetailBookSummaryQuery(Number(params.id));
  return (
    <div>
      <h1 className="text-lg font-bold">요약</h1>
      {data && <BookSummaryContent content={data.contents} />}
      <h1 className="text-lg font-bold">책 정보</h1>
      {data && (
        <BookItem
          isWide
          author={data.book_author}
          image={data.book_image}
          pubdate={data.book_pubdate}
          title={data.book_title}
          publisher={data.book_publisher}
          imageWidth={150}
        />
      )}
    </div>
  );
}
