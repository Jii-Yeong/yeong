import type { Meta, StoryObj } from '@storybook/react';
import { CommonDivider } from '@yeong/ui';

const meta = {
  title: 'UI/Divider/CommonDivider',
  component: CommonDivider,
} satisfies Meta<typeof CommonDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};