import type { Meta, StoryObj } from '@storybook/react';
import { CommonTextarea } from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'UI/Input/CommonTextarea',
  component: CommonTextarea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      description: 'textarea의 value',
      control: {
        disable: true,
      },
    },
    onChangeValue: {
      description: 'textarea change 이벤트 함수',
    },
    placeholder: {
      description: 'textarea의 placeholder',
    },
    alertText: {
      description: 'textarea 규칙에 맞지 않을 경우 띄울 경고 문구',
    },
    disabled: {
      description: 'textarea의 비활성화 여부',
    },
    className: {
      description:
        '`<textarea />` 태그의 className, Tailwind CSS value 적용 가능',
    },
    onEnter: {
      description:
        'textarea에 포커스하고 enter를 누를 경우 발생하는 이벤트 함수',
    },
    ref: {
      description:
        'textarea에 적용된 Ref Object (type: `Ref<HTMLTextareaElement>`)',
    },
  },
} satisfies Meta<typeof CommonTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    value: '',
    placeholder: '텍스트를 입력하세요.',
    onChangeValue: () => {},
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story) => {
    const [value, setValue] = useState('');
    const [alertValue, setAlertValue] = useState('');
    const [customValue, setCustomValue] = useState('');

    return (
      <div className="flex flex-row flex-wrap justify-center gap-x-[16px] gap-y-[36px]">
        <div className="w-[300px] h-[100px]">
          <Story
            args={{
              placeholder: '텍스트를 입력해주세요.',
              value,
              onChangeValue: (value: string) => setValue(value),
            }}
          />
        </div>
        <div className="w-[300px] h-[100px]">
          <Story
            args={{
              placeholder: '텍스트를 입력해주세요.',
              alertText: '텍스트를 2자 이상 입력해주세요.',
              value: alertValue,
              onChangeValue: (value: string) => setAlertValue(value),
            }}
          />
        </div>
        <div className="w-[300px] h-[100px]">
          <Story
            args={{
              placeholder: '제목을 입력해주세요.',
              value: customValue,
              onChangeValue: (value: string) => setCustomValue(value),
              className:
                'bg-dark-gray border-transparent text-white placeholder:text-white',
            }}
          />
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    value: '',
    placeholder: '텍스트를 입력하세요.',
    onChangeValue: () => {},
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px] h-[100px]">
        <Story
          args={{
            ...args,
            value,
            onChangeValue: (value: string) => {
              setValue(value);
            },
          }}
        />
      </div>
    );
  },
};

export const AlertMessage: Story = {
  args: {
    value: '',
    placeholder: '텍스트를 입력하세요.',
    alertText: '텍스트를 2자 이상 입력해주세요,',
    onChangeValue: () => {},
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px] h-[100px]">
        <Story
          args={{
            ...args,
            value,
            onChangeValue: (value: string) => {
              setValue(value);
            },
          }}
        />
      </div>
    );
  },
};

export const CustomStyle: Story = {
  args: {
    className:
      'bg-dark-gray border-transparent text-white placeholder:text-white',
    value: '',
    placeholder: '텍스트를 입력하세요.',
    onChangeValue: () => {},
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px] h-[100px]">
        <Story
          args={{
            ...args,
            value,
            onChangeValue: (value: string) => {
              setValue(value);
            },
          }}
        />
      </div>
    );
  },
};
