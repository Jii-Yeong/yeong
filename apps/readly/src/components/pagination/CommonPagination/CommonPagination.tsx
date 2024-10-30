import CommonButton from '@/components/ui/button/CommonButton/CommonButton'
import { COLORS } from '@/constants/color.constants'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'

type CommonPaginationProps = {
  totalCount: number
  clickButton: (pagination: number) => void
  viewButtonCount?: number
}

export default function CommonPagination({
  totalCount,
  clickButton,
  viewButtonCount = 10,
}: CommonPaginationProps) {
  const [buttonList, setButtonList] = useState<number[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [currentPagination, setCurrentPagination] = useState(0)

  const isMatchPagination = useCallback(
    (pagination: number) => currentPagination === pagination,
    [currentPagination]
  )

  const pageList = useMemo(() => {
    return new Array(totalCount).fill(0).map((item, index) => index)
  }, [totalCount])
  const isEndPrev = useCallback(() => currentSection <= 0, [currentSection])
  const isEndNext = useCallback(() => {
    return (
      totalCount <= viewButtonCount ||
      currentSection + 1 >= Math.ceil(totalCount / viewButtonCount)
    )
  }, [currentSection, totalCount])

  const clickPrevButton = () => {
    if (isEndPrev()) return
    const afterPrevList = pageList.slice(
      viewButtonCount * (currentSection - 1),
      viewButtonCount * currentSection
    )
    setButtonList(afterPrevList)
    setCurrentSection((section) => --section)
  }

  const clickNextButton = () => {
    if (isEndNext()) return
    const afterNextList = pageList.slice(
      viewButtonCount * (currentSection + 1),
      viewButtonCount * (currentSection + 2)
    )

    setButtonList(afterNextList)
    setCurrentSection((section) => ++section)
  }

  const clickPaginationButton = (pagination: number) => {
    clickButton(pagination)
    setCurrentPagination(pagination)
  }

  useEffect(() => {
    setButtonList(pageList.slice(0, viewButtonCount))
  }, [totalCount])

  return (
    <div className="flex flex-row items-center gap-x-[16px]">
      <div
        className="flex flex-row items-center gap-x-[4px]"
        onClick={clickPrevButton}
        style={{
          opacity: isEndPrev() ? 0.3 : 1,
          cursor: isEndPrev() ? 'default' : 'pointer',
        }}>
        <Icon icon="weui:arrow-filled" width={10} rotate={90} />
        <p>prev</p>
      </div>
      <div className="flex flex-row gap-x-[8px]">
        {buttonList.map((item) => (
          <CommonButton
            text={String(item + 1)}
            key={item}
            backgroundColor={
              isMatchPagination(item) ? COLORS.main : COLORS.white
            }
            color={isMatchPagination(item) ? COLORS.white : COLORS.black}
            width={35}
            height={35}
            borderColor={isMatchPagination(item) ? COLORS.white : COLORS.gray}
            borderRadius={45}
            fontSize={14}
            padding={0}
            clickButton={() => clickPaginationButton(item)}
          />
        ))}
      </div>
      <div
        onClick={clickNextButton}
        className="flex flex-row items-center gap-x-[4px]"
        style={{
          opacity: isEndNext() ? 0.3 : 1,
          cursor: isEndNext() ? 'default' : 'pointer',
        }}>
        <p>next</p>
        <Icon icon="weui:arrow-filled" width={10} />
      </div>
    </div>
  )
}
