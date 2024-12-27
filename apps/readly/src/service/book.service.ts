import {
  BOOK_CATEGORY_KEY,
  BOOK_RANK_KEY,
  BOOK_SUMMARY_KEY,
  BOOK_SUMMARY_LIKE_KEY,
} from '@/constants/query-key.constants';
import { queryClient } from '@/lib/react-query';
import {
  BookSummaryItemDto,
  BookSummaryListRequest,
  SearchBookRequest,
  SearchBookResponse,
  toBookCreatedRankModel,
  toBookSummaryItemModel,
  toDetailBookSummaryModel,
  toRecentBookItemModel,
  toSearchBookItemModel,
} from '@/model/book/book.dto';
import {
  addBookSummaryLikeCount,
  createBookSummary,
  deleteDetailBookSummary,
  editBookSummary,
  getBookCreatedRank,
  getBookSummaryLikeCount,
  getDetailBookSummary,
  getRecentBookList,
  searchBookList,
} from '@/repository/book.repository';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  getBookCategoryList,
  getBookSummaryList,
} from './../repository/book.repository';

export const searchBookMutation = () => {
  return useMutation<SearchBookResponse, any, SearchBookRequest>({
    mutationFn: async (params) => {
      const data = await searchBookList(params);
      return toSearchBookItemModel(data);
    },
  });
};

export const getRecentBookListQuery = () => {
  return useQuery({
    queryKey: [BOOK_SUMMARY_KEY],
    queryFn: async () => {
      const data = await getRecentBookList();
      return data.map((item) => toRecentBookItemModel(item));
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const getBookCreatedRankQuery = () => {
  return useQuery({
    queryKey: [BOOK_RANK_KEY],
    queryFn: async () => {
      const data = await getBookCreatedRank();
      return data.map((item, index) => toBookCreatedRankModel(item, index));
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const createBookSummaryMutation = () => {
  return useMutation({
    mutationFn: createBookSummary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_SUMMARY_KEY] });
    },
  });
};

export const getDetailBookSummaryQuery = (id: BookSummaryItemDto['id']) => {
  return useQuery({
    queryKey: [BOOK_SUMMARY_KEY, id],
    queryFn: async () => {
      const data = await getDetailBookSummary(id);
      return toDetailBookSummaryModel(data);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const editBookSummaryMutation = () => {
  return useMutation({
    mutationFn: editBookSummary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_SUMMARY_KEY] });
    },
  });
};

export const deleteDetailBookSummaryMutation = () => {
  return useMutation({
    mutationFn: deleteDetailBookSummary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_SUMMARY_KEY] });
    },
  });
};

export const getBookSummaryListQuery = (params: BookSummaryListRequest) => {
  return useInfiniteQuery({
    queryKey: [
      BOOK_SUMMARY_KEY,
      params.user_id,
      params.category_id,
      params.order,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const { total, list, nextOffset } = await getBookSummaryList({
        ...params,
        offset: pageParam * Number(params.limit || 16),
      });

      return {
        total,
        data: list.map((item) => toBookSummaryItemModel(item)),
        nextOffset,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const getBookSummaryLikeCountQuery = (id: BookSummaryItemDto['id']) => {
  return useQuery({
    queryKey: [BOOK_SUMMARY_LIKE_KEY, id],
    queryFn: async () => await getBookSummaryLikeCount(id),
  });
};

export const addBookSummaryLikeCountMutation = () => {
  return useMutation({
    mutationFn: addBookSummaryLikeCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_SUMMARY_LIKE_KEY] });
    },
  });
};

export const getBookCategoryListQuery = () => {
  return useQuery({
    queryKey: [BOOK_CATEGORY_KEY],
    queryFn: getBookCategoryList,
  });
};
