import { Icon } from '@iconify/react';
import { CommonButton } from '@yeong/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';

type CommonPaginationProps = {
  totalCount: number;
  clickButton: (pagination: number) => void;
  viewButtonCount?: number;
};

export default function CommonPagination({
  totalCount,
  clickButton,
  viewButtonCount = 10,
}: CommonPaginationProps) {
  const [buttonList, setButtonList] = useState<number[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(0);

  const isMatchPagination = useCallback(
    (pagination: number) => currentPagination === pagination,
    [currentPagination],
  );

  const pageList = useMemo(() => {
    return new Array(totalCount).fill(0).map((item, index) => index);
  }, [totalCount]);
  const isEndPrev = useCallback(() => currentSection <= 0, [currentSection]);
  const isEndNext = useCallback(() => {
    return (
      totalCount <= viewButtonCount ||
      currentSection + 1 >= Math.ceil(totalCount / viewButtonCount)
    );
  }, [currentSection, totalCount]);

  const clickPrevButton = () => {
    if (isEndPrev()) return;
    const afterPrevList = pageList.slice(
      viewButtonCount * (currentSection - 1),
      viewButtonCount * currentSection,
    );
    setButtonList(afterPrevList);
    setCurrentSection((section) => --section);
  };

  const clickNextButton = () => {
    if (isEndNext()) return;
    const afterNextList = pageList.slice(
      viewButtonCount * (currentSection + 1),
      viewButtonCount * (currentSection + 2),
    );

    setButtonList(afterNextList);
    setCurrentSection((section) => ++section);
  };

  const clickPaginationButton = (pagination: number) => {
    clickButton(pagination);
    setCurrentPagination(pagination);
  };

  const resetPagination = () => {
    setButtonList(pageList.slice(0, viewButtonCount));
    setCurrentSection(0);
    setCurrentPagination(0);
  };

  useEffect(() => {
    resetPagination();
  }, [totalCount]);

  return (
    <div className="flex flex-row items-center gap-x-[16px]">
      <div
        className="flex flex-row items-center gap-x-[4px]"
        onClick={clickPrevButton}
        style={{
          opacity: isEndPrev() ? 0.3 : 1,
          cursor: isEndPrev() ? 'default' : 'pointer',
        }}
      >
        <Icon icon="weui:arrow-filled" width={10} rotate={90} />
        <p>prev</p>
      </div>
      <div className="flex flex-row gap-x-[8px]">
        {buttonList.map((item) => (
          <CommonButton
            key={item}
            className={[
              'w-[35px] h-[35px] rounded-full text-[14px] p-0',
              isMatchPagination(item) ? 'bg-main' : 'bg-white',
              isMatchPagination(item) ? 'text-white' : 'text-black',
              isMatchPagination(item) ? 'border-white' : 'border-gray',
            ]}
            onClick={() => clickPaginationButton(item)}
          >
            {String(item + 1)}
          </CommonButton>
        ))}
      </div>
      <div
        onClick={clickNextButton}
        className="flex flex-row items-center gap-x-[4px]"
        style={{
          opacity: isEndNext() ? 0.3 : 1,
          cursor: isEndNext() ? 'default' : 'pointer',
        }}
      >
        <p>next</p>
        <Icon icon="weui:arrow-filled" width={10} />
      </div>
    </div>
  );
}
