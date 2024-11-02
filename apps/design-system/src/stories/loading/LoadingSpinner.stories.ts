import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '@yeong/ui';

const meta = {
  title: 'UI/Loading/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
