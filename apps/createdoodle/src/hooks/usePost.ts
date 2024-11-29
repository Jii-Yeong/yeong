import { CATEGORY_LIST } from '@/constants/category.constants';
import { POST_LIST } from '@/constants/post-list.constants';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const usePost = () => {
  const searchParams = useSearchParams();
  const categoryId = useMemo(
    () => searchParams.get('category'),
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

  const parsedPostList = useMemo(() => {
    if (!categoryId) return POST_LIST;

    return POST_LIST.filter((item) => item.categoryId === categoryId).reverse();
  }, [categoryId]);

  return {
    categoryId,
    categoryList: parsedCategoryList,
    postList: parsedPostList,
  };
};
