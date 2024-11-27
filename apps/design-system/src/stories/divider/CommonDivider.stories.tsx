import type { Meta, StoryObj } from '@storybook/react';
import { CommonDivider } from '@yeong/ui';

const meta = {
  title: 'UI/Divider/CommonDivider',
  component: CommonDivider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Divider의 방향',
    },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof CommonDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {},
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story, { args }) => {
    return (
      <div className="flex flex-col gap-y-[16px] w-[500px] items-center">
        <Story args={{ ...args }} />
        <Story args={{ ...args, className: 'border-[2px]' }} />
        <Story args={{ ...args, className: 'border-[3px]' }} />
        <div className="h-[100px] flex flex-row gap-x-[16px]">
          <Story args={{ ...args, type: 'vertical' }} />
          <Story
            args={{ ...args, type: 'vertical', className: 'border-[2px]' }}
          />
          <Story
            args={{ ...args, type: 'vertical', className: 'border-[3px]' }}
          />
        </div>
        <Story args={{ ...args, className: 'border-[2px] border-blue' }} />
        <Story args={{ ...args, className: 'border-[2px] border-green' }} />
        <Story args={{ ...args, className: 'border-[2px] border-dotted' }} />
      </div>
    );
  },
};

export const Default: Story = {
  args: { type: 'horizontal' },
  decorators: (Story, { args }) => {
    return (
      <div className="w-[500px] h-[100px] flex flex-row items-cetner justify-center">
        <Story args={{ ...args }} />
      </div>
    );
  },
};

export const BorderStyle: Story = {
  args: { type: 'horizontal', className: 'border-dotted border-red' },
  decorators: (Story, { args }) => {
    return (
      <div className="w-[500px] h-[100px] flex flex-row items-cetner justify-center">
        <Story args={{ ...args }} />
      </div>
    );
  },
};
