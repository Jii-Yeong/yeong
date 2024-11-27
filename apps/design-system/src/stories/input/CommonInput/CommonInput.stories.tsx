import { Icon } from '@iconify/react/dist/iconify.js';
import type { Meta, StoryObj } from '@storybook/react';
import { CommonInput } from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'UI/Input/CommonInput',
  component: CommonInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      description: 'input의 value',
      control: {
        disable: true,
      },
    },
    placeholder: {
      description: 'input의 placeholder',
    },
    alertText: {
      description: 'input 규칙에 맞지 않을 경우 띄울 경고 문구',
    },
    leftIcon: {
      description: 'input 안 오른쪽 아이콘',
      control: {
        disable: true,
      },
    },
    rightIcon: {
      description: 'input 안 왼쪽 아이콘',
      control: {
        disable: true,
      },
    },
    className: {
      description:
        'input을 감싸고 있는 `<div />` 태그의 className, Tailwind CSS value 적용 가능',
    },
    innerClassName: {
      description: '`<input />` 태그의 className, Tailwind CSS value 적용 가능',
    },
    type: {
      control: {
        type: 'radio',
      },
      options: ['text', 'number'],
      description: 'input의 타입',
    },
    onChange: {
      description: 'input change 이벤트 함수',
    },
    onEnter: {
      description: 'input에 포커스하고 enter를 누를 경우 발생하는 이벤트 함수',
    },
    ref: {
      description: 'input에 적용된 Ref Object (type: `Ref<HTMLInputElement>`)',
    },
  },
} satisfies Meta<typeof CommonInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  decorators: (Story) => {
    const [value, setValue] = useState('');
    const [alertValue, setAlertValue] = useState('');
    const [leftIconValue, setLeftIconValue] = useState('');
    const [rightIconValue, setRightIconValue] = useState('');
    const [customValue, setCustomValue] = useState('');
    const [numberValue, setNumberValue] = useState('0');

    return (
      <div className="flex flex-row flex-wrap justify-center gap-x-[16px] gap-y-[36px]">
        <Story
          args={{
            placeholder: '제목을 입력해주세요.',
            value,
            onChange: (value: string) => setValue(value),
          }}
        />
        <Story
          args={{
            placeholder: '제목을 입력해주세요.',
            alertText: '제목을 2자 이상 입력해주세요.',
            value: alertValue,
            onChange: (value: string) => setAlertValue(value),
          }}
        />
        <Story
          args={{
            placeholder: '제목을 입력해주세요.',
            leftIcon: <Icon icon="ic:outline-cloud" width={20} color="gray" />,
            value: leftIconValue,
            onChange: (value: string) => setLeftIconValue(value),
          }}
        />
        <Story
          args={{
            placeholder: '제목을 입력해주세요.',
            rightIcon: (
              <Icon icon="mingcute:check-fill" width={20} color="green" />
            ),
            value: rightIconValue,
            onChange: (value: string) => setRightIconValue(value),
          }}
        />
        <Story
          args={{
            placeholder: '제목을 입력해주세요.',
            value: customValue,
            onChange: (value: string) => setCustomValue(value),
            className: 'bg-dark-gray border-transparent',
            innerClassName: 'text-white placeholder:text-white',
          }}
        />
        <Story
          args={{
            value: numberValue,
            onChange: (value: string) => setNumberValue(value),
            className: 'w-[70px]',
            type: 'number',
          }}
        />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '제목을 입력해주세요.',
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <Story
        args={{
          ...args,
          value,
          onChange: (value: string) => {
            setValue(value);
          },
        }}
      />
    );
  },
};

export const AlertMessage: Story = {
  args: {
    type: 'text',
    placeholder: '제목을 입력해주세요.',
    alertText: '제목을 2자 이상 입력해주세요,',
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <Story
        args={{
          ...args,
          value,
          onChange: (value: string) => {
            setValue(value);
          },
        }}
      />
    );
  },
};

export const WithIcon: Story = {
  args: {
    type: 'text',
    placeholder: '제목을 입력해주세요.',
    leftIcon: <Icon icon="ic:outline-cloud" width={20} color="gray" />,
    rightIcon: <Icon icon="mingcute:check-fill" width={20} color="green" />,
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <Story
        args={{
          ...args,
          value,
          onChange: (value: string) => {
            setValue(value);
          },
        }}
      />
    );
  },
};

export const CustomStyle: Story = {
  args: {
    type: 'text',
    placeholder: '제목을 입력해주세요.',
    className: 'bg-dark-gray border-transparent',
    innerClassName: 'text-white placeholder:text-white',
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('');
    return (
      <Story
        args={{
          ...args,
          value,
          onChange: (value: string) => {
            setValue(value);
          },
        }}
      />
    );
  },
};

export const NumberType: Story = {
  args: {
    type: 'number',
  },
  decorators: (Story, { args }) => {
    const [value, setValue] = useState('0');
    return (
      <Story
        args={{
          ...args,
          value,
          onChange: (value: string) => {
            setValue(value);
          },
        }}
      />
    );
  },
};
