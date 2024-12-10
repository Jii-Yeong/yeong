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
import { CommonButton, CommonDivider, useToast } from '@yeong/ui';
import { formatDateToString } from '@yeong/utils/date';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function SummaryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
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

  const shareText = useMemo(() => {
    return `${detailSummaryData?.user_name} 님이 작성한 책 ${detailSummaryData?.book_title}의 요약 - Readly에서 확인해보세요.`;
  }, [detailSummaryData]);

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

  const clickKaKaoShareButton = () => {
    window.Kakao.Share.sendScrap({
      requestUrl: window.location.href,
      templateId: 114283,
      templateArgs: {
        title: shareText,
        like_count: likeCountData?.like_count || 0,
        view_count: detailSummaryData?.view_count || 0,
        path: pathname,
        profile_image: detailSummaryData?.user_image,
        user_name: detailSummaryData?.user_name,
      },
    });
  };

  const clickXShareButton = () => {
    return window.open(
      `https://twitter.com/intent/tweet?text=${shareText}&url=${window.location.href}`,
    );
  };

  const clickCopyLinkButton = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          description: '링크 복사가 완료되었습니다.',
          variant: 'outline',
          closeChildren: <Icon icon="iconamoon:close-bold" width={20} />,
        });
      })
      .catch(() => {
        toast({
          description: '링크 복사를 실패하였습니다.',
          variant: 'error',
          closeChildren: <Icon icon="iconamoon:close-bold" width={20} />,
        });
      });
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
                {detailSummaryData.start_page && detailSummaryData.end_page && (
                  <div className="flex flex-row text-dark-gray text-md gap-x-[2px]">
                    <p>{detailSummaryData.start_page}p</p>~
                    <p>{detailSummaryData.end_page}p</p>
                  </div>
                )}
              </div>
              {detailSummaryData.is_my && (
                <div className="flex flex-row gap-x-[8px] justify-end items-start">
                  <CommonButton
                    onClick={clickEditButton}
                    className="text-[14px] px-[8px] py-[2px]"
                    variant="outline"
                  >
                    수정
                  </CommonButton>
                  <CommonButton
                    onClick={clickDeleteButton}
                    className="text-[14px] text-white bg-red px-[8px] py-[2px] border-transparent"
                    variant="red"
                  >
                    삭제
                  </CommonButton>
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
        onClick={clickLikeButton}
        isLoading={isFetching || isPending}
        className="w-[150px] h-[44px] font-bold text-[20px]"
        variant="outline"
      >
        <Icon icon="line-md:heart-filled" color={likeIconColor} />
        {likeButtonText}
      </CommonButton>
      {detailSummaryData && likeCountData && (
        <div className="flex flex-row justify-center gap-x-[8px]">
          <CommonButton
            className="p-[4px] rounded-full w-[44px] h-[44px]"
            onClick={clickKaKaoShareButton}
            variant="ghost"
          >
            <Icon
              icon="simple-icons:kakaotalk"
              width={30}
              color={COLORS.brown}
            />
          </CommonButton>
          <CommonButton
            className="p-[4px] rounded-full w-[44px] h-[44px]t"
            onClick={clickXShareButton}
            variant="ghost"
          >
            <Icon icon="bi:twitter-x" width={30} color={COLORS.black} />
          </CommonButton>
          <CommonButton
            className="p-[4px] rounded-full w-[44px] h-[44px]"
            onClick={clickCopyLinkButton}
            variant="ghost"
          >
            <Icon
              icon="ant-design:paper-clip-outlined"
              width={35}
              color={COLORS.black}
            />
          </CommonButton>
        </div>
      )}
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
