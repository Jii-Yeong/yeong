import { COLORS } from '@/constants/color.constants';
import { formatDateToString, transferStringToDate } from '@yeong/utils/date';
import { parseDomSizeValue } from '@yeong/utils/string';
import Image from 'next/image';
import { useMemo } from 'react';

type BookItemProps = {
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  image: string;
  isbn?: string;
  isSelected?: boolean;
  imageWidth?: string | number;
  cursor?: 'default' | 'pointer';
  isWide?: boolean;
  clickItem?: (isbn: string) => void;
};

export default function BookItem({
  title,
  author,
  publisher,
  pubdate,
  image,
  isbn,
  isSelected,
  imageWidth = '100%',
  cursor = 'pointer',
  isWide,
  clickItem,
}: BookItemProps) {
  const handleClickItem = () => {
    if (clickItem && isbn) clickItem(isbn);
  };

  const pubdateFromFormat = useMemo(
    () => formatDateToString(transferStringToDate(pubdate, 'yyyyMMdd')),
    [pubdate],
  );
  return (
    <div
      className="p-[8px] rounded-[8px] w-full h-full flex gap-x-[16px]"
      style={{
        backgroundColor: isSelected ? COLORS.highlight : 'transparent',
        cursor,
        flexDirection: isWide ? 'row' : 'column',
      }}
      onClick={handleClickItem}
    >
      <Image
        src={image}
        alt="book-image"
        width={100}
        height={132}
        className="h-auto"
        style={{ width: parseDomSizeValue(imageWidth) }}
      />
      <div className="py-[8px] flex flex-col gap-y-[8px]">
        <p className="text-md font-bold leading-5">{title}</p>
        <p className="text-sm">{author}</p>
        <p className="text-sm text-dark-gray">{publisher}</p>
        <p className="text-sm text-dark-gray">{pubdateFromFormat}</p>
      </div>
    </div>
  );
}
