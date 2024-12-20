import { BookCreatedRankModel } from '@/model/book/book.model';
import Image from 'next/image';
import { useMemo } from 'react';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { EllipsisText } from '@yeong/ui';

export type BookRankItemProps = BookCreatedRankModel;

const rankTextVariants = cva(['text-lg', 'font-bold', 'w-[50px]'], {
  variants: {
    rank: {
      first: ['text-[#f5d706]'],
      second: ['text-[#9b9b9b]'],
      third: ['text-[#c06e01]'],
    },
  },
});

export default function BookRankItem({
  author,
  count,
  image,
  link,
  rank,
  title,
}: BookRankItemProps) {
  const rankLabel = useMemo(() => {
    if (rank === 1) return 'first';
    else if (rank === 2) return 'second';

    return 'third';
  }, [rank]);

  const rankTitle = useMemo(() => {
    switch (rankLabel) {
      case 'first':
        return '1ST';
      case 'second':
        return '2ND';
      case 'third':
        return '3RD';
    }
  }, [rankLabel]);

  return (
    <Link
      href={link}
      target="_blank"
      className="flex flex-row items-center gap-x-[8px] w-full"
    >
      <p className={rankTextVariants({ rank: rankLabel })}>{rankTitle}</p>
      <div className="md:hover:bg-light-gray rounded-[8px] p-[16px] flex flex-row items-center gap-x-[16px] w-full transition-colors">
        <Image
          src={image}
          alt="book-image"
          width={100}
          height={145}
          className="book-image"
        />
        <div>
          <EllipsisText text={title} lineClamp={3} />
          <p className="text-md text-dark-gray">{author}</p>
          <p className="text-md font-bold">{count}개 등록</p>
        </div>
      </div>
    </Link>
  );
}
