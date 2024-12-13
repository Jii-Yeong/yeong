import { BookSummaryItemProps } from '@/components/book/BookSummaryItem/BookSummaryItem';

export type BookSummaryItemModel = BookSummaryItemProps;

export type SearchBookItemModel = {
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  image: string;
  isbn?: string;
};
