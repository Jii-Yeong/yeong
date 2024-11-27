import type { Meta, StoryObj } from '@storybook/react';
import { CommonFileInput } from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'UI/Input/CommonFileInput',
  component: CommonFileInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      description: '파일 input의 value, `FileList | null`',
    },
    onChangeValue: {
      description: '업로드된 파일에 따라 value를 바꾸는 이벤트 함수',
    },
    placeholder: {
      description: '파일 input의 placeholder',
    },
    accept: {
      description: '파일 확장자 제한',
    },
    className: {
      description:
        '`<input />` 을 감싸는 `<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof CommonFileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: null,
    onChangeValue: () => {},
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState<FileList | null>(null);
    return (
      <div>
        <Story
          args={{
            ...args,
            value,
            onChangeValue: (files) => setValue(files),
            className: 'w-[180px]',
          }}
        />
      </div>
    );
  },
};
