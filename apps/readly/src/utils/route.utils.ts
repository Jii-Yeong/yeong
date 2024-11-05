import { BookSummaryItemModel } from '@/model/book/book.model';

export const getRootPage = () => {
  return '/';
};

export const getSummaryDetailPage = (id: BookSummaryItemModel['id']) => {
  return `/summary/detail/${id}`;
};

export const getSummaryCreatePage = () => {
  return '/summary/create';
};

export const getSummaryEditPage = (id: BookSummaryItemModel['id']) => {
  return `/summary/edit/${id}`;
};
