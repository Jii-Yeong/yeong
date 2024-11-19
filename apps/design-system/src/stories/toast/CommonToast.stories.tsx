import type { Meta, StoryObj } from '@storybook/react';
import { CommonButton, CommonToast, useToast } from '@yeong/ui';
import CommonToaster from '../../../../../packages/ui/src/components/toast/CommonToaster/CommonToaster.jsx';

const meta = {
  title: 'UI/Toast/CommonToast',
  component: CommonToast,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Title', description: 'Description' },
  decorators: (Story) => {
    const { toast, toasts } = useToast();

    console.log(toasts);
    return (
      <div>
        <CommonButton
          onClick={() => toast({ title: '타이틀', description: '설명' })}
        >
          클릭
        </CommonButton>
        <CommonToaster />
      </div>
    );
  },
};

export const Content: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    className: 'static',
  },
};
