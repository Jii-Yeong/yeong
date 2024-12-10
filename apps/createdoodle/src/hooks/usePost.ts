import {CATEGORY_LIST} from '@/constants/category.constants';
import {POST_LIST} from '@/constants/post-list.constants';
import {useRouter, useSearchParams} from 'next/navigation';
import {useMemo} from 'react';

export const usePost = () => {
  const viewPostCount = 6;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const categoryId = useMemo(
    () => searchParams.get('category'),
    [searchParams],
  );
  const pagination = useMemo(
    () => (searchParams.get('page') ? Number(searchParams.get('page')) : 0),
    [searchParams],
  );

  const parsedCategoryList = useMemo(() => {
    return CATEGORY_LIST.map((item) => {
      const count = POST_LIST.filter((post) =>
        item.id ? post.categoryId === item.id : true,
      ).length;
      return {
        label: item.name,
        value: item.id,
        count,
      };
    });
  }, [POST_LIST, CATEGORY_LIST]);

  const filteredPostList = useMemo(() => {
    if (!categoryId) {
      return POST_LIST;
    }
    return POST_LIST.filter((item) => item.categoryId === categoryId);
  }, [POST_LIST, categoryId]);

  const parsedPostList = useMemo(() => {
    return [...filteredPostList]
      .reverse()
      .slice(pagination * viewPostCount, (pagination + 1) * viewPostCount);
  }, [filteredPostList, pagination]);

  const totalPaginationCount = useMemo(
    () => Math.ceil(filteredPostList.length / viewPostCount),
    [pagination, parsedCategoryList, categoryId],
  );

  const handleClickPagination = (value: number) => {
    currentParams.set('page', String(value));
    router.push(`?${currentParams.toString()}`);
  };

  return {
    categoryId,
    categoryList: parsedCategoryList,
    postList: parsedPostList,
    pagination,
    handleClickPagination,
    totalPaginationCount,
  };
};
