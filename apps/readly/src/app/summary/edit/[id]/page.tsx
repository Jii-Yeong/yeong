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
          defaultEndPage={data.end_page}
          defaultStartPage={data.start_page}
          defaultCategoryId={data.category_id}
          defaultCategoryName={data.category_name}
          isEdit
          summaryId={String(id)}
        />
      )}
    </>
  );
}
