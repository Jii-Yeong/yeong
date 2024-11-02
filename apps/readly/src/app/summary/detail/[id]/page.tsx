'use client';

import BookItem from '@/components/book/BookItem/BookItem';
import BookSummaryContent from '@/components/book/BookSummaryContent/BookSummaryContent';
import { COLORS } from '@/constants/color.constants';
import {
  addBookSummaryLikeCountMutation,
  getBookSummaryLikeCountQuery,
  getDetailBookSummaryQuery,
} from '@/service/book.service';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CommonButton } from '@yeong/ui';
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

  return (
    <div>
      <h1 className="text-lg font-bold">요약</h1>
      {detailSummaryData && (
        <>
          <div className="flex flex-row justify-end text-dark-gray text-md gap-x-[16px]">
            <p>{`조회수 : ${detailSummaryData.view_count}`}</p>
          </div>
          <BookSummaryContent content={detailSummaryData.contents} />
        </>
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
      <h1 className="text-lg font-bold">책 정보</h1>
      {detailSummaryData && (
        <BookItem
          isWide
          author={detailSummaryData.book_author}
          image={detailSummaryData.book_image}
          pubdate={detailSummaryData.book_pubdate}
          title={detailSummaryData.book_title}
          publisher={detailSummaryData.book_publisher}
          imageWidth={150}
        />
      )}
    </div>
  );
}
