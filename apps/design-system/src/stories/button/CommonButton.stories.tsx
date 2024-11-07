import { InlineIcon } from '@iconify/react/dist/iconify.js';
import type { Meta, StoryObj } from '@storybook/react';
import { CommonButton } from '@yeong/ui';

const meta = {
  title: 'UI/Button/CommonButton',
  component: CommonButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Button',
  },
};

export const Icon: Story = {
  args: {
    text: 'Button',
    leftIcon: <InlineIcon icon="line-md:heart-filled" />,
    rightIcon: <InlineIcon icon="line-md:heart-filled" />,
  },
};
