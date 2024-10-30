'use client'

import SearchBookSection from '@/components/book/SearchBookSection/SearchBookSection'
import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { SearchBookItem } from '@/model/book.dto'
import CommonButton from '@/components/ui/button/CommonButton/CommonButton'
import { createBookSummaryMutation } from '@/service/book.service'
import { COLORS } from '@/constants/color.constants'

export default function Page() {
  const [content, setContent] = useState<string>('')
  const [selectedBook, setSelectedBook] = useState<SearchBookItem | null>(null)
  const { mutate } = createBookSummaryMutation()

  const handleEditorChange = (content: string) => {
    setContent(content)
  }

  const clickEndButton = () => {
    if (!content || !selectedBook) return
    mutate({
      content,
      bookInfo: selectedBook,
    })
  }

  return (
    <div className="flex flex-col gap-y-[16px]">
      <h1 className="text-lg font-bold">읽은 책</h1>
      <SearchBookSection clickSelect={setSelectedBook} />
      <h1 className="text-lg font-bold">요약</h1>
      <Editor
        id="tiny-mce-editor"
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onEditorChange={handleEditorChange}
      />
      <CommonButton
        text="작성"
        clickButton={clickEndButton}
        fontSize={16}
        fontWeight="bold"
        backgroundColor={COLORS.main}
        color={COLORS.white}
        borderColor="transparent"
        padding="16px 10px"
      />
    </div>
  )
}
