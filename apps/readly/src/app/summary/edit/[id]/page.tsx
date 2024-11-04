'use client';

import BookSummaryCreateSection from '@/components/book/BookSummaryCreateSection/BookSummaryCreateSection';
import { getDetailBookSummaryQuery } from '@/service/book.service';
import { useParams } from 'next/navigation';

export default function SummaryEditPage() {
  const { id } = useParams();

  const { data } = getDetailBookSummaryQuery(Number(id));
  return (
    <>
      {data && (
        <BookSummaryCreateSection
          defaultBook={{
            author: data.book_author,
            image: data.book_image,
            pubdate: data.book_pubdate,
            title: data.book_title,
            publisher: data.book_publisher,
            link: data.book_link,
            isbn: '',
          }}
          defaultContent={data.contents}
          defaultEndPage={String(data.end_page)}
          defaultStartPage={String(data.start_page)}
          isEdit
          summaryId={String(id)}
        />
      )}
    </>
  );
}
