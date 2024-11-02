import type { Meta, StoryObj } from '@storybook/react';
import { EllipsisText } from '@yeong/ui';

const meta = {
  title: 'UI/Text/EllipsisText',
  component: EllipsisText,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EllipsisText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'ACT Prep Plus 2025: Study Guide Includes 5 Full Length Practice Tests, 100s of Practice Questions, and 1 Year Access to Online Quizzes and Video Instr (Study Guide includes 5 Full Length Practice Tests, 100s of Practice Questions, and 1 Year Access to Online Quizzes and Video Instruction)',
    width: 300,
  },
};
