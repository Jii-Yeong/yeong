import type { Meta, StoryObj } from '@storybook/react';
import { CommonButton } from '@yeong/ui';
import { Icon } from '@iconify/react';

const meta = {
  title: 'UI/Button/CommonButton',
  component: CommonButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: '버튼 안 컨텐츠',
    },
    variant: {
      control: { type: 'radio' },
      description: '버튼의 종류',
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
    },
    onClick: {
      description: '버튼 클릭 이벤트 함수',
    },
  },
} satisfies Meta<typeof CommonButton>;

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
      <div className="flex flex-row gap-x-[16px]">
        <Story args={{ variant: 'primary', children: 'Button' }} />
        <Story args={{ variant: 'secondary', children: 'Button' }} />
        <Story args={{ variant: 'red', children: 'Button' }} />
        <Story args={{ variant: 'outline', children: 'Button' }} />
        <Story args={{ variant: 'ghost', children: 'Button' }} />
        <Story args={{ variant: 'link', children: 'Button' }} />
        <Story
          args={{
            variant: 'outline',
            children: <Icon icon="ant-design:paper-clip-outlined" width={20} />,
            className: 'rounded-full p-[8px]',
          }}
        />
        <Story
          args={{
            variant: 'outline',
            children: (
              <>
                <Icon icon="ant-design:paper-clip-outlined" width={20} />
                Copy
              </>
            ),
          }}
        />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    disabled: false,
    isLoading: false,
  },
};

export const OnlyIcon: Story = {
  args: {
    children: <Icon icon="line-md:heart-filled" />,
    variant: 'outline',
    className: 'rounded-full p-[8px]',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon icon="line-md:heart-filled" />
        Icon Button
      </>
    ),
    variant: 'outline',
  },
};
