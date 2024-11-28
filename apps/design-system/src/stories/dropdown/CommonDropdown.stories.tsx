import type { Meta, StoryObj } from '@storybook/react';
import {
  CommonChip,
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
} from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'UI/Dropdown/CommonDropdown',
  component: CommonDropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      description: '드롭다운의 value 값',
      control: {
        disable: true,
      },
    },
    children: {
      description: '드롭다운 클릭 시 밑에 나타날 컴포넌트',
      control: {
        disable: true,
      },
    },
    onChange: {
      description: '드롭다운 선택 이벤트 함수',
    },
    placeholder: {
      description: '초기 드롭다운 컨트롤러에 나타날 글자',
    },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
    isLoading: {
      description: '데이터 로딩 여부, true일시 로딩스피너가 나타남',
    },
    label: {
      description: '드롭다운 컨트롤러에 보일 컨텐츠',
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof CommonDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: (Story, { args }) => {
    const list = [
      {
        children: '테스트1',
        value: 'test1',
      },
      {
        children: '테스트2',
        value: 'test2',
      },
      {
        children: '테스트3',
        value: 'test3',
      },
    ];

    const [value, setValue] = useState('');

    return (
      <Story
        args={{
          ...args,
          children: (
            <CommonDropdownInner>
              {list.map((item) => (
                <CommonDropdownItem value={item.value} key={item.value}>
                  {item.children}
                </CommonDropdownItem>
              ))}
            </CommonDropdownInner>
          ),
          onChange: (value: string) => setValue(value),
          value: value,
        }}
      />
    );
  },
  args: {
    value: '',
    children: '',
    onChange: (value: string) => console.log(value),
    isLoading: false,
    placeholder: '선택',
  },
};

export const ComponentItem: Story = {
  decorators: (Story, { args }) => {
    const list = [
      {
        children: <CommonChip text="테스트1" className="hover:opacity-100" />,
        value: 'test1',
      },
      {
        children: <CommonChip text="테스트2" className="hover:opacity-100" />,
        value: 'test2',
      },
      {
        children: <CommonChip text="테스트3" className="hover:opacity-100" />,
        value: 'test3',
      },
    ];

    const [value, setValue] = useState('');
    return (
      <Story
        args={{
          ...args,
          children: (
            <CommonDropdownInner>
              {list.map((item) => (
                <CommonDropdownItem value={item.value} key={item.value}>
                  {item.children}
                </CommonDropdownItem>
              ))}
            </CommonDropdownInner>
          ),
          value: value,
          onChange: (value: string) => setValue(value),
        }}
      />
    );
  },
  args: {
    value: '',
    children: '',
    onChange: (value: string) => console.log(value),
    isLoading: false,
    placeholder: '선택',
  },
};
