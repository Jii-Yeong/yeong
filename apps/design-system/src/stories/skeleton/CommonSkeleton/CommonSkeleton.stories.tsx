import type { Meta, StoryObj } from '@storybook/react';
import { CommonSkeleton } from '@yeong/ui';

const meta = {
  title: 'UI/Skeleton/CommonSkeleton',
  component: CommonSkeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      description: '스켈레톤의 너비, `string | number`',
    },
    height: {
      description: '스켈레톤의 높이, `string | number`',
    },
    shape: {
      control: { type: 'radio' },
      options: ['rectangle', 'circle'],
      description: '스켈레톤의 모양',
    },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof CommonSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story) => {
    return (
      <div className="flex flex-row flex-wrap gap-x-[16px] gap-y-[16px] justify-center items-end">
        <div className="flex flex-col gap-y-[16px]">
          <Story args={{ width: 100, height: 100, shape: 'circle' }} />
          <Story args={{ width: 100, height: 20 }} />
        </div>
        <div className="w-[300px] flex flex-col gap-y-[16px]">
          <Story args={{ width: '100%', height: 25 }} />
          <Story args={{ width: '80%', height: 20 }} />
          <Story args={{ width: '50%', height: 10 }} />
        </div>
        <div className="flex flex-row gap-x-[16px]">
          <Story args={{ width: 100, height: 100 }} />
          <Story args={{ width: 80, height: 80 }} />
          <Story args={{ width: 70, height: 70 }} />
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    width: 100,
    height: 100,
    shape: 'rectangle',
  },
};
