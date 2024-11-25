import type { Meta, StoryObj } from '@storybook/react';
import { CommonInput } from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'UI/Input/CommonInput',
  component: CommonInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    setInputValue: () => {},
  },
  decorators: (Story) => {
    const [value, setValue] = useState('');
    return (
      <Story
        args={{
          value,
          setInputValue: (value: string) => {
            setValue(value);
          },
        }}
      />
    );
  },
};
