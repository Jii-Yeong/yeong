import { SearchBookType } from '@/components/book/SearchBookSection/SearchBookSection';
import { UserInfoDto } from '../user.dto';
import { BookSummaryItemModel } from './book.model';
export type SearchBookRequest = {
  query: string;
  display?: string;
  start?: string;
  sort?: 'sim' | 'date';
};

export type SearchBookResponse = {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchBookItem[];
};

export type SearchBookItem = {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
};

export type CreateBookSummaryRequest = {
  content: string;
  bookInfo: SearchBookType;
  startPage: string;
  endPage: string;
  category_id: number;
};

export type EditBookSummaryRequest = CreateBookSummaryRequest;

export type BookSummaryListRequest = {
  category_id?: BookCategoryDto['id'] | null;
  user_id?: UserInfoDto['id'] | null;
  order?: string;
};

export type BookSummaryItemDto = {
  id: number;
  contents: string;
  book_title: string;
  book_author: string;
  book_publisher: string;
  book_pubdate: string;
  view_count: number;
  like_count: number;
  user_id: string;
  created_at: string;
  book_image: string;
  book_link: string;
  start_page: number;
  end_page: number;
  user_name: string;
  user_image: string;
  is_my: boolean;
  category_id: number;
  category_name: string;
  comment_count: number;
};

export const toBookSummaryItemModel = (
  item: BookSummaryItemDto,
): BookSummaryItemModel => {
  return {
    id: item.id,
    bookAuthor: item.book_author,
    bookTitle: item.book_title,
    content: item.contents,
    endPage: item.end_page,
    startPage: item.start_page,
    userId: item.user_id,
    userImage: item.user_image,
    userName: item.user_name,
    createAt: item.created_at,
    category: item.category_name,
    categoryId: item.category_id,
    likeCount: item.like_count,
    viewCount: item.view_count,
    commentCount: item.comment_count,
  };
};

export type BookSummaryLikeCountResponse = {
  like_count: number;
  is_clicked: boolean;
};

export type BookCategoryDto = {
  created_at: string;
  id: number;
  name: string;
  summary_count: number;
};
