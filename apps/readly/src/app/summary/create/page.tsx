'use client';

import BookSummaryCreateSection from '@/components/book/BookSummaryCreateSection/BookSummaryCreateSection';
import { SearchBookItem } from '@/model/book/book.dto';
import { createBookSummaryMutation } from '@/service/book.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [content, setContent] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<SearchBookItem | null>(null);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const { mutateAsync, isPending } = createBookSummaryMutation();
  const router = useRouter();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const clickEndButton = async () => {
    if (!content || !selectedBook) return;
    await mutateAsync({
      content,
      bookInfo: selectedBook,
      startPage,
      endPage,
    });
    router.push('/');
  };

  return <BookSummaryCreateSection />;
}
