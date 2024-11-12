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
    onChange: (value: string) => console.log(value),
    children: (
      <CommonDropdownInner>
        {list.map((item) => (
          <CommonDropdownItem value={item.value} key={item.value}>
            {item.children}
          </CommonDropdownItem>
        ))}
      </CommonDropdownInner>
    ),
  },
};
