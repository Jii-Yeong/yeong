import type { Meta, StoryObj } from '@storybook/react';
import { CommonTextarea } from '@yeong/ui';

const meta = {
  title: 'UI/Input/CommonTextarea',
  component: CommonTextarea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setTextareaValue: () => {},
    placeholder: '텍스트를 입력하세요.',
  },
};
