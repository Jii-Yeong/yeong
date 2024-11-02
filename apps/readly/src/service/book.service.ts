import { getBoookSummaryList } from './../repository/book.repository';
import { BOOK_SUMMARY_KEY } from "@/constants/query-key.constants";
import { queryClient } from "@/lib/react-query";
import { BookSummaryItemDto, toBookSummaryItenModel } from "@/model/book/book.dto";
import { createBookSummary, deleteDetailBoookSummary, getDetailBookSummary, searchBookList } from "@/repository/book.repository";
import { useMutation, useQuery } from "@tanstack/react-query";

export const searchBookMutation = () => {
  return useMutation({
    mutationFn: searchBookList,
  })
}

export const createBookSummaryMutation = () => {
  return useMutation({
    mutationFn: createBookSummary
  })
}

export const getDetailBookSummaryQuery = (id: BookSummaryItemDto['id']) => {
  return useQuery({
    queryKey: [BOOK_SUMMARY_KEY, id],
    queryFn: () => getDetailBookSummary(id)
  })
}

export const deleteDetailBookSummaryMutation = () => {
  return useMutation({
    mutationFn: deleteDetailBoookSummary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOK_SUMMARY_KEY] })
    }
  })
}

export const getBoookSummaryListQuery = () => {
  return useQuery({
    queryKey: [BOOK_SUMMARY_KEY],
    queryFn: async () => {
      const data = await getBoookSummaryList()
      return data.map(item => toBookSummaryItenModel(item))
    },
  })
}