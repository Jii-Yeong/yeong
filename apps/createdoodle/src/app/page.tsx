'use client';

import PostList from '@/components/list/PostList';
import { COLORS } from '@/constants/colors.constants';
import { usePost } from '@/hooks/usePost';
import { CommonPagination } from '@yeong/ui';

export default function Home() {
  const { postList, pagination, totalPaginationCount, handleClickPagination } =
    usePost();
  return (
    <div className="w-full flex flex-col items-center max-w-4xl gap-y-[16px]">
      <PostList list={postList} />
      <div className="bg-white p-[16px] rounded-[16px] w-full flex justify-center">
        <CommonPagination
          pagination={pagination}
          onClickPagination={handleClickPagination}
          totalCount={totalPaginationCount}
          buttonColor={COLORS.main}
        />
      </div>
    </div>
  );
}
