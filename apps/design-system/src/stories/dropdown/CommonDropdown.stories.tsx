import type { Meta, StoryObj } from '@storybook/react';
import {
  CommonDropdown,
  CommonDropdownInner,
  CommonDropdownItem,
} from '@yeong/ui';

const meta = {
  title: 'UI/Dropdown/CommonDropdown',
  component: CommonDropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  args: {
    clickItem: (value: string) => console.log(value),

    children: ({ clickItem }) => (
      <CommonDropdownInner>
        {list.map((item) => (
          <CommonDropdownItem
            value={item.value}
            clickItem={clickItem}
            key={item.value}
          >
            {item.children}
          </CommonDropdownItem>
        ))}
      </CommonDropdownInner>
    ),

    className: "h-20",
    placeholder: "aa"
  },
};
