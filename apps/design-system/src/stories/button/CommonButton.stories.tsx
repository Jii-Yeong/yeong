import type { Meta, StoryObj } from '@storybook/react';
import { CommonButton } from '@yeong/ui';

const meta = {
  title: 'UI/Button/CommonButton',
  component: CommonButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      description: '버튼 안 텍스트',
    },
    disabled: {
      description: '비활성화 여부',
    },
    isLoading: {
      description: '로딩 여부, `true`일 시 로딩스피너가 나타남',
    },
    loadingColor: {
      description: '로딩스피너의 색깔',
    },
    loadingWidth: {
      description: '로딩스피너의 너비',
    },
    className: {
      description:
        '`<button />` 태그의 className, Tailwind CSS value 적용 가능',
      type: 'string',
    },
    classList: {
      description:
        '`<button />` 태그의 classList, 변동되는 값에 따른 Tailwind CSS value 적용 가능 (tailwind-merge의 ClassNameValue와 동일)',
    },
    onClick: {
      description: '버튼 클릭 이벤트 함수',
    },
    leftIconProps: {
      description:
        '왼쪽에 표기될 아이콘의 Props, `@iconify/react` 라이브러리 컴포넌트의 Props와 동일',
    },
    rightIconProps: {
      description:
        '오른쪽에 표기될 아이콘의 Props, `@iconify/react` 라이브러리 컴포넌트의 Props와 동일',
    },
  },
} satisfies Meta<typeof CommonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Button',
    disabled: false,
    isLoading: false,
  },
};

export const Icon: Story = {
  args: {
    text: 'Button',
    leftIconProps: { icon: 'line-md:heart-filled' },
    rightIconProps: { icon: 'line-md:heart-filled' },
  },
};
