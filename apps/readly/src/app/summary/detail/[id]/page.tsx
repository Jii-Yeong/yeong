'use client';

import BookItem from '@/components/book/BookItem/BookItem';
import BookSummaryContent from '@/components/book/BookSummaryContent/BookSummaryContent';
import BookItemSkeleton from '@/components/skeleton/book/BookItemSkeleton';
import BookSummaryDetailSkeleton from '@/components/skeleton/book/BookSummaryDetailSkeleton';
import { COLORS } from '@/constants/color.constants';
import {
  addBookSummaryLikeCountMutation,
  getBookSummaryLikeCountQuery,
  getDetailBookSummaryQuery,
} from '@/service/book.service';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CommonButton, CommonDivider, ProfileImage } from '@yeong/ui';
import { formatDateToString } from '@yeong/utils/date';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function SummaryDetailPage() {
  const params = useParams();
  const { data: detailSummaryData } = getDetailBookSummaryQuery(
    Number(params.id),
  );
  const { data: likeCountData, isFetching } = getBookSummaryLikeCountQuery(
    Number(params.id),
  );
  const { mutate, isPending } = addBookSummaryLikeCountMutation();

  const likeButtonText = useMemo(() => {
    return `좋아요 ${likeCountData?.like_count || 0}`;
  }, [likeCountData?.like_count]);

  const likeIconColor = useMemo(() => {
    return likeCountData?.is_clicked ? COLORS.red : COLORS.gray;
  }, [likeCountData?.is_clicked]);

  const clickLikeButton = () => {
    mutate({ id: Number(params.id) });
  };

  const createAt = useMemo(() => {
    if (!detailSummaryData) return '';
    return formatDateToString(new Date(detailSummaryData.created_at));
  }, [detailSummaryData?.created_at]);

  return (
    <div className="flex flex-col gap-y-[32px] items-center mt-[32px]">
      {detailSummaryData ? (
        <>
          <div className="flex flex-row justify-between text-md gap-x-[16px] w-full">
            <div className="flex flex-row items-center gap-x-[8px]">
              <ProfileImage imageSrc={detailSummaryData.user_image} />
              <p>{detailSummaryData.user_name}</p>
            </div>
            <div className="text-dark-gray flex flex-row gap-x-[8px] items-center">
              <span>{createAt}</span>
              <span>|</span>
              <span>{`조회수 : ${detailSummaryData.view_count}`}</span>
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
        isLeftIcon={<Icon icon="line-md:heart-filled" color={likeIconColor} />}
        fontSize={20}
        fontWeight={700}
        width={130}
        isLoading={isFetching || isPending}
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
    </div>
  );
}
