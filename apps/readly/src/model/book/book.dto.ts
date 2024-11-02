import { BookSummaryItemModel } from './book.model';
export type SearchBookRequest = {
  query: string;
  display?: string;
  start?: string;
  sort?: 'sim' | 'date'
}

export type SearchBookResponse = {
  lastBuildDate: string
  total: number
  start: number
  display: number
  items: SearchBookItem[]
}

export type SearchBookItem = {
  title: string
  link: string
  image: string
  author: string
  discount: string
  publisher: string
  pubdate: string
  isbn: string
  description: string
}

export type CreateBookSummaryRequest = {
  content: string;
  bookInfo: SearchBookItem;
  startPage: string;
  endPage: string;
}

export type BookSummaryItemDto = {
  id: number
  contents: string
  book_title: string
  book_author: string
  book_publisher: string
  book_pubdate: string
  view_count: number
  like_count: number
  user_id: string
  created_at: string
  book_image: string
  book_link: string
  start_page: number
  end_page: number
  user_name: string
  user_image: string
}

export const toBookSummaryItenModel = (item: BookSummaryItemDto): BookSummaryItemModel => {
  return {
    id: item.id,
    bookAuthor: item.book_author,
    bookTitle: item.book_title,
    content: item.contents,
    endPage: item.end_page,
    startPage: item.start_page,
    userImage: item.user_image,
    userName: item.user_name,
  }
}