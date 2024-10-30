import {PostListItemType} from '@/types/post.types';
import PostListItem from '../item/PostListItem';

type PostListProps = {
  list: PostListItemType[];
};

export default function PostList({list}: PostListProps) {
  return (
    <div className="flex flex-col gap-y-4 max-w-4xl">
      {list.map((item, index) => (
        <PostListItem item={item} key={`${JSON.stringify(item)}-${index}`} />
      ))}
    </div>
  );
}
