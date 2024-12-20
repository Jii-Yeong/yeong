import { SearchBookType } from '@/components/book/SearchBookSection/SearchBookSection';
import { transferStringToDate } from '@yeong/utils/date';
import { UserInfoDto } from '../user.dto';
import { BookCreatedRankModel, BookSummaryItemModel } from './book.model';
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

export type BookItemDto = Pick<
  BookSummaryItemDto,
  | 'book_author'
  | 'book_image'
  | 'book_link'
  | 'book_pubdate'
  | 'book_publisher'
  | 'book_title'
  | 'isbn'
>;

export type SearchBookItem = {
  title: string;
  link: string;
  image: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;
};

export const toSearchBookItemModel = (item: SearchBookResponse) => {
  const bookItem: SearchBookItem[] = item.items.map((item) => {
    return {
      author: item.author,
      image: item.image,
      isbn: item.isbn,
      link: item.link,
      pubdate: transferStringToDate(item.pubdate, 'yyyyMMdd').toISOString(),
      publisher: item.publisher,
      title: item.title,
    };
  });
  return {
    ...item,
    items: bookItem,
  };
};

export type RecentBookDto = BookItemDto;

export const toRecentBookItemModel = (item: RecentBookDto): SearchBookItem => {
  return {
    author: item.book_author,
    image: item.book_image,
    isbn: item.isbn,
    link: item.book_link,
    pubdate: item.book_pubdate,
    publisher: item.book_publisher,
    title: item.book_title,
  };
};

export type BookCreatedRankDto = BookItemDto & { created_count: number };

export const toBookCreatedRankModel = (
  item: BookCreatedRankDto,
  index: number,
): BookCreatedRankModel => {
  return {
    author: item.book_author,
    image: item.book_image,
    link: item.book_link,
    title: item.book_title,
    count: item.created_count,
    rank: index + 1,
  };
};

export type CreateBookSummaryRequest = {
  content: string;
  bookInfo: SearchBookType;
  startPage?: number;
  endPage?: number;
  category_id: number;
};

export type EditBookSummaryRequest = CreateBookSummaryRequest;

export type BookSummaryListRequest = {
  category_id?: BookCategoryDto['id'] | null;
  user_id?: UserInfoDto['id'] | null;
  order?: string;
  limit?: number;
  offset?: number;
  nextOffset?: number;
};

export type BookSummaryListResponse = {
  total: number;
  list: BookSummaryItemDto[];
  nextOffset: number;
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
  isbn: string;
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
