import type { Meta, StoryObj } from '@storybook/react';
import { CommonChip } from '@yeong/ui';

const meta = {
  title: 'UI/Chip/CommonChip',
  component: CommonChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Chip',
    isActive: false,
  },
};
