'use client';

import { PostListItemType } from '@/types/post.types';
import Image from 'next/image';
import Link from 'next/link';

type PostListItemProps = {
  item: PostListItemType;
};

export default function PostListItem({ item }: PostListItemProps) {
  return (
    <Link
      href={`/post/${item.id}`}
      className="flex flex-col bg-[#ffffff] rounded-lg p-6 min-h-[129px] gap-x-[32px] w-full"
    >
      <div className="flex flex-row justify-between">
        <p className="text-[#7b71be]">{item.category}</p>
        <p className="text-md text-dark-gray">{item.date}</p>
      </div>
      <div className="flex flex-row gap-y-2 flex-1 justify-between">
        <p className="text-lg">{item.title}</p>
        {item.thumbnail && (
          <Image
            className="my-0"
            src={`/thumbnail/${item.thumbnail}.png`}
            alt="post-thumbnail"
            width={128}
            height={80}
          />
        )}
      </div>
    </Link>
  );
}
