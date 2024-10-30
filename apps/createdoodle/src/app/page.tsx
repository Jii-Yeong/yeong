import PostList from '@/components/list/PostList';
import {postList} from '@/constants/post-list.constants';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <PostList list={postList} />
    </div>
  );
}
