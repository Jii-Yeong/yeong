import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImage } from '@yeong/ui';

const meta = {
  title: 'UI/Image/ProfileImage',
  component: ProfileImage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large', 'xLarge'],
      description: '이미지 사이즈',
    },
    imageSrc: {
      description: '이미지',
    },
    className: {
      description:
        '이미지 바깥 `<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  args: {},
  decorators: (Story, { args }) => {
    return (
      <div className="flex flex-row gap-x-[16px] items-end">
        <Story args={{ ...args }} />
        <Story args={{ ...args, size: 'medium' }} />
        <Story args={{ ...args, size: 'large' }} />
        <Story args={{ ...args, size: 'xLarge' }} />
      </div>
    );
  },
};

export const Default: Story = {
  args: { size: 'small' },
};
