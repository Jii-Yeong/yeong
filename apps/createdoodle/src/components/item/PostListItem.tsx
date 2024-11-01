'use client';

import {PostListItemType} from '@/types/post.types';
import Image from 'next/image';
import Link from 'next/link';

type PostListItemProps = {
  item: PostListItemType;
};

export default function PostListItem({item}: PostListItemProps) {
  // const thumbnail = require(`public/thumbnail/${item.thumbnail}.png`);
  return (
    <Link
      href={`/post/${item.id}`}
      className="flex flex-row bg-[#ffffff] rounded-lg p-6 min-h-[129px]">
      <div className="flex flex-col gap-y-2 flex-1">
        <p className="text-[#7b71be]">{item.category}</p>
        <p className="text-xl">{item.title}</p>
      </div>
      {item.thumbnail && (
        <Image
          className="my-0"
          src={`/thumbnail/${item.thumbnail}.png`}
          alt="post-thumbnail"
          width={128}
          height={80}
        />
      )}
    </Link>
  );
}
