'use client'

import { getBoookSummaryListQuery } from '@/service/book.service'
import BookSummaryItem from '../BookSummaryItem/BookSummaryItem'

export default function BookSummaryList() {
  const { data } = getBoookSummaryListQuery()
  return (
    <div className="grid grid-cols-4 gap-x-[16px] gap-y-[16px]">
      {data &&
        data?.map((item, index) => (
          <BookSummaryItem {...item} key={`${JSON.stringify(item)}-${index}`} />
        ))}
    </div>
  )
}
