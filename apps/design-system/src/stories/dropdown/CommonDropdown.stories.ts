import type { Meta, StoryObj } from '@storybook/react';
import { CommonDropdown } from '@yeong/ui';

const meta = {
  title: 'UI/Dropdown/CommonDropdown',
  component: CommonDropdown,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    list: [
      {
        label: '테스트1',
        value: '테스트1',
      },
      {
        label: '테스트2',
        value: '테스트2',
      },
      {
        label: '테스트3',
        value: '테스트3',
      },
      {
        label: '테스트4',
        value: '테스트4',
      },
      {
        label: '테스트5',
        value: '테스트5',
      },
    ],
  },
};
