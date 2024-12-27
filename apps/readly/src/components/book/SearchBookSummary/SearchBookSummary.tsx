import {
  CommonButton,
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
  CommonDropdownItemProps,
  CommonInput,
} from '@yeong/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const searchTypeList: CommonDropdownItemProps[] = [
  {
    value: 'title',
    children: '책 제목',
  },
  {
    value: 'author',
    children: '작가',
  },
  {
    value: 'category',
    children: '카테고리',
  },
];

export default function SearchBookSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const [option, setOption] = useState('title');
  const [value, setValue] = useState('');
  const [alertText, setAlertText] = useState('');

  const changeValue = (value: string) => {
    setValue(value);
  };

  const changeOptionValue = (value: string) => {
    setOption(value);
  };

  const clickSearchButton = () => {
    if (!value) {
      setAlertText('검색어를 입력해주세요.');
      return;
    }
    currentParams.set('type', option);
    currentParams.set('keyword', value);
    router.push(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/summary/search?${currentParams.toString()}`,
    );
  };
  return (
    <div className="flex flex-row gap-x-[16px] w-full">
      <CommonDropdown
        value={option}
        onChange={changeOptionValue}
        label="책 제목"
      >
        <CommonDropdownInner>
          {searchTypeList.map((item) => (
            <CommonDropdownItem value={item.value} key={item.value}>
              {item.children}
            </CommonDropdownItem>
          ))}
        </CommonDropdownInner>
      </CommonDropdown>
      <CommonInput
        className="flex-1"
        value={value}
        onChangeValue={changeValue}
        placeholder="검색어를 입력하세요."
        onEnter={clickSearchButton}
        alertText={alertText}
      />
      <CommonButton onClick={clickSearchButton}>검색</CommonButton>
    </div>
  );
}
