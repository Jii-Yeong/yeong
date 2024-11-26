import type { Meta, StoryObj } from "@storybook/react"

import DefaultButton from "@/components/button/DefaultButton/DefaultButton.tsx"

const meta = {
  title: "Button",
  component: DefaultButton,
} satisfies Meta<typeof DefaultButton>

export default meta

export const Button: StoryObj<typeof meta> = {
  args: {
    text: "Button",
  },
}
