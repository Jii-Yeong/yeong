'use client';

import BookCategoryChip from '@/components/book/BookCategoryChip/BookCategoryChip';
import BookItem from '@/components/book/BookItem/BookItem';
import BookSummaryContent from '@/components/book/BookSummaryContent/BookSummaryContent';
import SummaryComment from '@/components/comment/SummaryComment/SummaryComment';
import BookItemSkeleton from '@/components/skeleton/book/BookItemSkeleton';
import BookSummaryDetailSkeleton from '@/components/skeleton/book/BookSummaryDetailSkeleton';
import UserProfile from '@/components/user/UserProfile/UserProfile';
import { COLORS } from '@/constants/color.constants';
import {
  addBookSummaryLikeCountMutation,
  deleteDetailBookSummaryMutation,
  getBookSummaryLikeCountQuery,
  getDetailBookSummaryQuery,
} from '@/service/book.service';
import { getRootPage, getSummaryEditPage } from '@/utils/route.utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CommonButton, CommonDivider } from '@yeong/ui';
import { formatDateToString } from '@yeong/utils/date';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function SummaryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: detailSummaryData } = getDetailBookSummaryQuery(Number(id));
  const { data: likeCountData, isFetching } = getBookSummaryLikeCountQuery(
    Number(id),
  );
  const { mutate: likeMutate, isPending } = addBookSummaryLikeCountMutation();
  const { mutateAsync: deleteMutate } = deleteDetailBookSummaryMutation();

  const likeButtonText = useMemo(() => {
    return `좋아요 ${likeCountData?.like_count || 0}`;
  }, [likeCountData?.like_count]);

  const likeIconColor = useMemo(() => {
    return likeCountData?.is_clicked ? COLORS.red : COLORS.gray;
  }, [likeCountData?.is_clicked]);

  const createAt = useMemo(() => {
    if (!detailSummaryData) return '';
    return formatDateToString(new Date(detailSummaryData.created_at));
  }, [detailSummaryData?.created_at]);

  const clickLikeButton = () => {
    likeMutate({ id: Number(id) });
  };

  const clickEditButton = () => {
    if (!id) return;
    router.push(getSummaryEditPage(Number(id)));
  };

  const clickDeleteButton = async () => {
    await deleteMutate(Number(id));
    router.push(getRootPage());
  };

  return (
    <div className="flex flex-col gap-y-[32px] items-center mt-[32px] w-full">
      {detailSummaryData ? (
        <>
          <div className="w-full flex flex-col gap-y-[8px]">
            <div className="flex flex-row justify-between text-md gap-x-[16px] w-full">
              <UserProfile
                userId={detailSummaryData.user_id}
                userImage={detailSummaryData.user_image}
                userName={detailSummaryData.user_name}
              />
              <div className="flex flex-row gap-x-[16px]">
                <div className="text-dark-gray flex flex-row gap-x-[8px] items-center">
                  <span>{createAt}</span>
                  <span>|</span>
                  <span>{`조회수 : ${detailSummaryData.view_count}`}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                {detailSummaryData.category_name && (
                  <BookCategoryChip
                    text={detailSummaryData.category_name}
                    value={String(detailSummaryData.category_id)}
                  />
                )}
              </div>
              {detailSummaryData.is_my && (
                <div className="flex flex-row gap-x-[8px] justify-end">
                  <CommonButton
                    text="수정"
                    clickButton={clickEditButton}
                    className="text-[14px] px-[8px] py-[2px]"
                  />
                  <CommonButton
                    text="삭제"
                    clickButton={clickDeleteButton}
                    className="text-[14px] text-white bg-red px-[8px] py-[2px] border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
          <BookSummaryContent content={detailSummaryData.contents} />
        </>
      ) : (
        <BookSummaryDetailSkeleton />
      )}
      <CommonButton
        text={likeButtonText}
        clickButton={clickLikeButton}
        leftIcon={<Icon icon="line-md:heart-filled" color={likeIconColor} />}
        isLoading={isFetching || isPending}
        className="w-[130px] font-bold text-[20px]"
      />
      <CommonDivider />
      {detailSummaryData ? (
        <BookItem
          isWide
          author={detailSummaryData.book_author}
          image={detailSummaryData.book_image}
          pubdate={detailSummaryData.book_pubdate}
          title={detailSummaryData.book_title}
          publisher={detailSummaryData.book_publisher}
          imageWidth={150}
        />
      ) : (
        <BookItemSkeleton isWide imageWidth={150} />
      )}
      <SummaryComment />
    </div>
  );
}
