import type { Meta, StoryObj } from '@storybook/react';
import { CommonChip } from '@yeong/ui';

const meta = {
  title: 'UI/Chip/CommonChip',
  component: CommonChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outline', 'red', 'green', 'brown'],
      description: '칩의 종류',
    },
  },
} satisfies Meta<typeof CommonChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    text: 'Chip',
    isActive: false,
    value: '',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story) => {
    return (
      <div className="grid grid-cols-6 gap-x-[16px] gap-y-[16px]">
        <Story args={{ variant: 'primary', text: 'Chip' }} />
        <Story args={{ variant: 'secondary', text: 'Chip' }} />
        <Story args={{ variant: 'outline', text: 'Chip' }} />
        <Story args={{ variant: 'red', text: 'Chip' }} />
        <Story args={{ variant: 'green', text: 'Chip' }} />
        <Story args={{ variant: 'brown', text: 'Chip' }} />
        <Story args={{ variant: 'primary', text: 'Chip', isActive: true }} />
        <Story args={{ variant: 'secondary', text: 'Chip', isActive: true }} />
        <Story args={{ variant: 'outline', text: 'Chip', isActive: true }} />
        <Story args={{ variant: 'red', text: 'Chip', isActive: true }} />
        <Story args={{ variant: 'green', text: 'Chip', isActive: true }} />
        <Story args={{ variant: 'brown', text: 'Chip', isActive: true }} />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    text: 'Chip',
    isActive: false,
    value: '',
  },
};
