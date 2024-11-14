import type { Meta, StoryObj } from '@storybook/react';
import { CommonFileInput } from '@yeong/ui';

const meta = {
  title: 'UI/Input/CommonFileInput',
  component: CommonFileInput,
  parameters: {
    layout: 'centered',
  },

} satisfies Meta<typeof CommonFileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => { }
  },
};