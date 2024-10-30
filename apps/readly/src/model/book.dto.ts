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
  bookInfo: SearchBookItem
}

export type BookSummaryItem = {
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
}