import { readlyApiAxiosInstance } from "@/api/readly-api"
import { BookSummaryItem, CreateBookSummaryRequest, SearchBookRequest, SearchBookResponse } from "@/model/book.dto"

export const searchBookList = async (params: SearchBookRequest) => {
  const { data } = await readlyApiAxiosInstance().post<SearchBookResponse>('/book/search', params)
  return data
}

export const createBookSummary = async (params: CreateBookSummaryRequest) => {
  await readlyApiAxiosInstance().post('/book/summary/create', params)
}

export const getDetailBookSummary = async (id: BookSummaryItem['id']) => {
  const { data } = await readlyApiAxiosInstance().get<BookSummaryItem>('/book/summary', {
    params: {
      id
    }
  })
  return data
}

export const deleteDetailBoookSummary = async (id: BookSummaryItem['id']) => {
  await readlyApiAxiosInstance().delete('/book/summary/delete', {
    params: {
      id
    }
  })
}

export const getBoookSummaryList = async () => {
  const { data } = await readlyApiAxiosInstance().get<BookSummaryItem[]>('/book/summary/list')
  return data
}