import { readlyApiAxiosInstance } from "@/api/readly-api"
import { BookSummaryItemDto, CreateBookSummaryRequest, SearchBookRequest, SearchBookResponse } from "@/model/book/book.dto"

export const searchBookList = async (params: SearchBookRequest) => {
  const { data } = await readlyApiAxiosInstance().post<SearchBookResponse>('/book/search', params)
  return data
}

export const createBookSummary = async (params: CreateBookSummaryRequest) => {
  await readlyApiAxiosInstance().post('/book/summary/create', params)
}

export const getDetailBookSummary = async (id: BookSummaryItemDto['id']) => {
  const { data } = await readlyApiAxiosInstance().get<BookSummaryItemDto>('/book/summary', {
    params: {
      id
    }
  })
  return data
}

export const deleteDetailBoookSummary = async (id: BookSummaryItemDto['id']) => {
  await readlyApiAxiosInstance().delete('/book/summary/delete', {
    params: {
      id
    }
  })
}

export const getBoookSummaryList = async () => {
  const { data } = await readlyApiAxiosInstance().get<BookSummaryItemDto[]>('/book/summary/list')
  return data
}