'use client';

import PostList from '@/components/list/PostList';
import { usePost } from '@/hooks/usePost';

export default function Home() {
  const { postList } = usePost();
  return (
    <div className="w-full flex flex-col items-center">
      <PostList list={postList} />
    </div>
  );
}
