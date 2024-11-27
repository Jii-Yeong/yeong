import type { Meta, StoryObj } from '@storybook/react';
import { CommonPagination } from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'Components/Pagination/CommonPagination',
  component: CommonPagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    totalCount: {
      description: '총 페이지 갯수',
    },
    viewButtonCount: {
      description: '한번에 보여줄 버튼 갯수',
    },
    pagination: {
      control: {
        disable: true,
      },
      description: '현재 페이지네이션 value, 0부터 시작',
    },
    onClickPagination: {
      description: '페이지 버튼 클릭 시 호출되는 이벤트 함수',
    },
    buttonColor: {
      description: '페이지 버튼 색상',
    },
  },
} satisfies Meta<typeof CommonPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCount: 10,
    viewButtonCount: 5,
    pagination: 0,
    onClickPagination: () => {},
  },
  decorators: (Story, { args }) => {
    const [pagination, setPagination] = useState(0);
    return (
      <div>
        <Story
          args={{
            ...args,
            pagination,
            onClickPagination: (value: number) => setPagination(value),
          }}
        />
      </div>
    );
  },
};
