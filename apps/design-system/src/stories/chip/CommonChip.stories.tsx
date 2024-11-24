import type { Meta, StoryObj } from '@storybook/react';
import { CommonChip } from '@yeong/ui';

const meta = {
  title: 'UI/Chip/CommonChip',
  component: CommonChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      description: '칩 안에 들어갈 텍스트',
    },
    value: {
      description: '클릭 이벤트 시 전달될 value 값',
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outline', 'red', 'green', 'brown'],
      description: '칩의 종류',
    },
    isActive: {
      description: 'active 상태 여부',
    },
    disabled: {
      description: 'disabled 상태 여부',
    },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
    backgroundColor: {
      description: '커스텀 칩 배경 색상 지정',
    },
    activeColor: {
      description: '커스텀 칩 active 색상 지정',
    },
    onClick: {
      description: '칩 클릭 이벤트 함수',
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
    disabled: false,
    variant: 'primary',
  },
};

export const CustomColor: Story = {
  args: {
    text: 'Chip',
    backgroundColor: '#fde2ff',
    activeColor: '#ff20d5',
    isActive: false,
    disabled: false,
  },
};
