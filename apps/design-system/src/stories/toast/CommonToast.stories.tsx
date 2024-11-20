import type { Meta, StoryObj } from '@storybook/react';
import { CommonButton, CommonToast, useToast } from '@yeong/ui';
import { CommonToaster } from '@yeong/ui';
import { Icon } from '@iconify/react/dist/iconify.js';

const meta = {
  title: 'UI/Toast/CommonToast',
  component: CommonToast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      description: '토스트 제목',
    },
    description: {
      description: '토스트 설명',
    },
    variant: {
      control: { type: 'radio' },
      options: ['normal', 'outline', 'success', 'error'],
      description: '토스트 종류',
    },
    className: {
      description: '`<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
    closeChildren: {
      description: '닫기 버튼 컴포넌트',
      control: {
        disable: true,
      },
    },
    isShow: {
      description: '토스트 공개/숨김 여부',
      control: {
        disable: true,
      },
    },
    id: {
      description: '토스트 컴포넌트의 id',
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof CommonToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story) => {
    return (
      <div className="flex flex-row gap-x-[16px] gap-y-[16px] flex-wrap justify-center">
        <Story
          args={{
            variant: 'normal',
            title: 'Normal title',
            description: 'Normal description',
          }}
        />
        <Story
          args={{
            variant: 'outline',
            title: 'Outline title',
            description: 'Outline description',
          }}
        />
        <Story
          args={{
            variant: 'success',
            title: 'Success title',
            description: 'Success description',
          }}
        />
        <Story
          args={{
            variant: 'error',
            title: 'Error title',
            description: 'Error description',
          }}
        />
        <Story
          args={{
            variant: 'outline',
            title: 'Custom close button title',
            description: 'Custom close button description',
            closeChildren: <Icon icon="iconamoon:close-bold" width={20} />,
          }}
        />
      </div>
    );
  },
};

export const Test: Story = {
  args: { title: 'Title', description: 'Description' },
  decorators: () => {
    const { toast } = useToast();
    return (
      <div>
        <CommonButton
          onClick={() =>
            toast({
              title: 'Title',
              description: 'Description',
            })
          }
          variant="outline"
        >
          Click
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
    variant: 'normal',
  },
};

export const CustomCloseIcon: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    variant: 'outline',
    closeChildren: <Icon icon="iconamoon:close-bold" width={20} />,
  },
};
