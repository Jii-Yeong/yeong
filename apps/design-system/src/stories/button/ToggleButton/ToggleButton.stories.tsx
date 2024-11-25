import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from '@yeong/ui';

const meta = {
  title: 'UI/Button/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outline', 'green', 'red'],
      description: '버튼의 종류',
    },
    onClick: {
      description: '버튼 클릭 시 호출되는 이벤트 함수',
    },
    defaultState: {
      description: '버튼의 초기 상태',
      control: {
        disable: true,
      },
    },
    className: {
      description:
        '토글 버튼 래퍼 컨트롤러의 className, Tailwind CSS value 적용 가능',
    },
    toggleClassName: {
      description: '토글 버튼의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    onClick: () => {},
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story) => {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-x-[16px]">
          <Story args={{ variant: 'primary', defaultState: true }} />
          <Story args={{ variant: 'secondary', defaultState: true }} />
          <Story args={{ variant: 'outline', defaultState: true }} />
          <Story args={{ variant: 'green', defaultState: true }} />
          <Story args={{ variant: 'red', defaultState: true }} />
        </div>
        <div className="flex flex-row gap-x-[16px] mt-[32px] items-end">
          <Story
            args={{ variant: 'primary', defaultState: true, size: 'small' }}
          />
          <Story
            args={{ variant: 'primary', defaultState: true, size: 'medium' }}
          />
          <Story
            args={{ variant: 'primary', defaultState: true, size: 'large' }}
          />
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    onClick: () => {},
    variant: 'primary',
    size: 'medium',
  },
};

export const Custom: Story = {
  args: {
    onClick: () => {},
    variant: 'primary',
    size: 'medium',
    defaultState: true,
    className: 'bg-[#f2f1e3] rounded-none',
    toggleClassName: 'rounded-none bg-blue',
  },
};
