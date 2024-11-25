import { readlyApiAxiosInstance } from '@/api/readly-api';
import {
  BookCategoryDto,
  BookSummaryItemDto,
  BookSummaryLikeCountResponse,
  BookSummaryListRequest,
  CreateBookSummaryRequest,
  EditBookSummaryRequest,
  SearchBookRequest,
  SearchBookResponse,
} from '@/model/book/book.dto';

export const searchBookList = async (params: SearchBookRequest) => {
  const { data } = await readlyApiAxiosInstance().post<SearchBookResponse>(
    '/book/search',
    params,
  );
  return data;
};

export const createBookSummary = async (params: CreateBookSummaryRequest) => {
  await readlyApiAxiosInstance().post('/book/summary/create', params);
};

export const getDetailBookSummary = async (id: BookSummaryItemDto['id']) => {
  const { data } = await readlyApiAxiosInstance().get<BookSummaryItemDto>(
    '/book/summary',
    {
      params: {
        id,
      },
    },
  );
  return data;
};

export const editBookSummary = async (
  params: EditBookSummaryRequest & { id: BookSummaryItemDto['id'] },
) => {
  await readlyApiAxiosInstance().put('/book/summary/edit', params);
};

export const deleteDetailBoookSummary = async (
  id: BookSummaryItemDto['id'],
) => {
  await readlyApiAxiosInstance().delete('/book/summary/delete', {
    params: {
      id,
    },
  });
};

export const getBookSummaryList = async (params: BookSummaryListRequest) => {
  const { data } = await readlyApiAxiosInstance().get<BookSummaryItemDto[]>(
    '/book/summary/list',
    {
      params,
    },
  );
  return data;
};

export const getBookSummaryLikeCount = async (id: BookSummaryItemDto['id']) => {
  const { data } =
    await readlyApiAxiosInstance().get<BookSummaryLikeCountResponse>(
      '/book/summary/like-count',
      {
        params: {
          id,
        },
      },
    );
  return data;
};

export const addBookSummaryLikeCount = async (
  params: Pick<BookSummaryItemDto, 'id'>,
) => {
  await readlyApiAxiosInstance().post('/book/summary/click-like', params);
};

export const getBookCategoryList = async () => {
  const { data } = await readlyApiAxiosInstance().get<BookCategoryDto[]>(
    '/book/category-list',
  );
  return data;
};
