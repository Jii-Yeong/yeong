import { CommonDivider, ProfileImage } from '@yeong/ui'
import BookSummaryContent from '../BookSummaryContent/BookSummaryContent'

export type BookSummaryItemProps = {
  content: string
  bookTitle: string
  bookAuthor: string
  userImage: string
  userName: string
  startPage: number
  endPage: number
}

export default function BookSummaryItem({
  content,
  bookAuthor,
  bookTitle,
  userImage,
  userName,
  startPage,
  endPage,
}: BookSummaryItemProps) {
  return (
    <div className="w-full border border-gray border-solid rounded-[16px] p-[16px] flex flex-col">
      <div className="bg-light-blue p-[8px] rounded-[8px] ">
        <div className="overflow-hidden h-[120px]">
          <BookSummaryContent content={content} />
        </div>
      </div>
      <CommonDivider marginVertical={8} />
      <div className="flex flex-col justify-between h-full">
        <div>
          <div>
            <p className="text-md">{bookTitle}</p>
            <p className="text-md text-dark-gray">{bookAuthor}</p>
          </div>
          <div className="flex flex-row gap-x-[4px] text-sm text-dark-gray">
            <p>{startPage}p</p>
            <p>~</p>
            <p>{endPage}p</p>
          </div>
        </div>
        <div className="flex flex-row gap-x-[8px] items-center justify-end">
          <ProfileImage imageSrc={userImage} />
          <p className="text-md">{userName}</p>
        </div>
      </div>
    </div>
  )
}
