import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from '@yeong/ui';
import { useState } from 'react';

const meta = {
  title: 'UI/Button/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outline', 'green', 'red'],
      description: '버튼의 종류',
    },
    onClick: {
      description: '버튼 클릭 시 호출되는 이벤트 함수',
    },
    isOn: {
      description: '버튼의 상태',
      control: {
        disable: true,
      },
    },
    className: {
      description:
        '토글 버튼 래퍼 컨트롤러의 className, Tailwind CSS value 적용 가능',
    },
    toggleClassName: {
      description: '토글 버튼의 className, Tailwind CSS value 적용 가능',
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  args: {
    onClick: () => {},
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  decorators: (Story) => {
    const [isPrimaryOn, setIsPrimaryOn] = useState(true);
    const [isSecondaryOn, setIsSecondaryOn] = useState(true);
    const [isOutlineOn, setIsOutlineOn] = useState(true);
    const [isGreenOn, setIsGreenOn] = useState(true);
    const [isRedOn, setIsRedOn] = useState(true);
    const [isSmallOn, setIsSmallOn] = useState(true);
    const [isMediumOn, setIsMediumOn] = useState(true);
    const [isLargeyOn, setIsLargeOn] = useState(true);
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-x-[16px]">
          <Story
            args={{
              variant: 'primary',
              isOn: isPrimaryOn,
              onClick: (value: boolean) => {
                setIsPrimaryOn(value);
              },
            }}
          />
          <Story
            args={{
              variant: 'secondary',
              isOn: isSecondaryOn,
              onClick: (value: boolean) => {
                setIsSecondaryOn(value);
              },
            }}
          />
          <Story
            args={{
              variant: 'outline',
              isOn: isOutlineOn,
              onClick: (value: boolean) => {
                setIsOutlineOn(value);
              },
            }}
          />
          <Story
            args={{
              variant: 'green',
              isOn: isGreenOn,
              onClick: (value: boolean) => {
                setIsGreenOn(value);
              },
            }}
          />
          <Story
            args={{
              variant: 'red',
              isOn: isRedOn,
              onClick: (value: boolean) => {
                setIsRedOn(value);
              },
            }}
          />
        </div>
        <div className="flex flex-row gap-x-[16px] mt-[32px] items-end">
          <Story
            args={{
              variant: 'primary',
              isOn: isSmallOn,
              size: 'small',
              onClick: (value: boolean) => {
                setIsSmallOn(value);
              },
            }}
          />
          <Story
            args={{
              variant: 'primary',
              isOn: isMediumOn,
              size: 'medium',
              onClick: (value: boolean) => {
                setIsMediumOn(value);
              },
            }}
          />
          <Story
            args={{
              variant: 'primary',
              isOn: isLargeyOn,
              size: 'large',
              onClick: (value: boolean) => {
                setIsLargeOn(value);
              },
            }}
          />
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    onClick: () => {},
    variant: 'primary',
    size: 'medium',
  },
  decorators: (Story, { args }) => {
    const [isOn, setIsOn] = useState(true);
    return (
      <Story
        args={{
          ...args,
          onClick: (value: boolean) => {
            setIsOn(value);
          },
          isOn,
        }}
      />
    );
  },
};

export const Custom: Story = {
  args: {
    onClick: () => {},
  },
  decorators: (Story, { args }) => {
    const [isOn, setIsOn] = useState(true);
    return (
      <Story
        args={{
          ...args,
          onClick: (value: boolean) => {
            setIsOn(value);
          },
          variant: 'primary',
          size: 'medium',
          className: 'bg-[#f2f1e3] rounded-none',
          toggleClassName: 'rounded-none bg-blue',
          isOn,
        }}
      />
    );
  },
};
