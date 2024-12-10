'use client';

import {PostListItemType} from '@/types/post.types';
import Image from 'next/image';
import Link from 'next/link';

type PostListItemProps = {
  item: PostListItemType;
};

export default function PostListItem({item}: PostListItemProps) {
  return (
    <Link
      href={`/post/${item.id}`}
      className="flex flex-col bg-[#ffffff] rounded-lg p-6 gap-x-[32px] w-full md:hover:bg-light-gray transition min-h-[120px] sm:min-h-[142px]">
      <div className="flex flex-row justify-between">
        <p className="text-[#7b71be]">{item.category}</p>
        <p className="text-md text-dark-gray">{item.date}</p>
      </div>
      <div className="flex flex-row gap-y-2 flex-1 justify-between gap-x-[16px]">
        <p className="text-base sm:text-lg">{item.title}</p>
        {item.thumbnail && (
          <Image
            className="my-0 h-auto"
            src={`/thumbnail/${item.thumbnail}.png`}
            alt="post-thumbnail"
            width={110}
            height={60}
          />
        )}
      </div>
    </Link>
  );
}
