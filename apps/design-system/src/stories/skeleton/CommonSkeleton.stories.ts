import type { Meta, StoryObj } from '@storybook/react';
import { CommonSkeleton } from '@yeong/ui';

const meta = {
  title: 'UI/Skeleton/CommonSkeleton',
  component: CommonSkeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 100,
    height: 100,
  },
};
