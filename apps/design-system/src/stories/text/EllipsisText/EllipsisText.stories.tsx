import type { Meta, StoryObj } from '@storybook/react';
import { EllipsisText } from '@yeong/ui';

const meta = {
  title: 'UI/Text/EllipsisText',
  component: EllipsisText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      description: '말줄임 대상이 될 텍스트',
    },
    width: {
      description: '컴포넌트의 너비, `string | number`',
    },
    height: {
      description: '컴포넌트의 높이, `string | number`',
    },
    lineClamp: {
      description: '말줄임 표시로 제한할 줄글 갯수, 기본은 2줄',
    },
    fontSize: {
      description: '텍스트의 폰트 사이즈, `string | number`',
    },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof EllipsisText>;

export default meta;
type Story = StoryObj<typeof meta>;

const longText =
  'ACT Prep Plus 2025: Study Guide Includes 5 Full Length Practice Tests, 100s of Practice Questions, and 1 Year Access to Online Quizzes and Video Instr (Study Guide includes 5 Full Length Practice Tests, 100s of Practice Questions, and 1 Year Access to Online Quizzes and Video Instruction)';

export const Default: Story = {
  args: {
    text: longText,
    width: 300,
    lineClamp: 2,
    fontSize: 16,
  },
};
