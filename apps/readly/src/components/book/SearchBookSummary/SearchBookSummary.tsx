import {
  CommonButton,
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
  CommonDropdownItemProps,
  CommonInput,
} from '@yeong/ui';
import { useState } from 'react';

export default function SearchBookSummary() {
  const [option, setOption] = useState('title');
  const [value, setValue] = useState('');
  const dropdownList: CommonDropdownItemProps[] = [
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
  const changeValue = (value: string) => {
    setValue(value);
  };
  const changeOptionValue = (value: string) => {
    setOption(value);
  };
  return (
    <div className="flex flex-row gap-x-[16px] w-full">
      <CommonDropdown
        value={option}
        onChange={changeOptionValue}
        label="책 제목"
      >
        <CommonDropdownInner>
          {dropdownList.map((item) => (
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
      />
      <CommonButton>검색</CommonButton>
    </div>
  );
}
