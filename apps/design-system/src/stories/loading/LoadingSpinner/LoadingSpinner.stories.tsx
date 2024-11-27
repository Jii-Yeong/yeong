import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '@yeong/ui';
import { UI_COLORS } from '@yeong/ui/colors';

const meta = {
  title: 'UI/Loading/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'large'],
      description: '로딩 스피너의 사이즈',
    },
    color: { control: 'color', description: '로딩 스피너 메인 컬러' },
    backgroundColor: { control: 'color', description: '로딩 스피너 배경 컬러' },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

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
      <div className="flex flex-row flex-wrap gap-x-[16px] gap-y-[16px] items-center">
        <Story args={{ size: 'small' }} />
        <Story args={{ size: 'medium' }} />
        <Story args={{ size: 'large' }} />
        <Story
          args={{ color: UI_COLORS.blue, backgroundColor: UI_COLORS.gray }}
        />
        <Story args={{ className: 'border-[50px]' }} />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const CustomColor: Story = {
  args: {
    size: 'medium',
    color: UI_COLORS.blue,
    backgroundColor: UI_COLORS.gray,
  },
};

export const CustomStyle: Story = {
  args: {
    size: 'medium',
    className: 'border-[50px]',
  },
};
