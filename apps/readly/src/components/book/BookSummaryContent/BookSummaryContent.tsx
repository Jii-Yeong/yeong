'use client'

import { useEffect, useRef } from 'react'
import '@/styles/editor.scss'

type BookSummaryContentProps = {
  content: string
}

export default function BookSummaryContent({
  content,
}: BookSummaryContentProps) {
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!divRef.current) return
    divRef.current.innerHTML = content
  }, [])

  return <div ref={divRef}></div>
}
