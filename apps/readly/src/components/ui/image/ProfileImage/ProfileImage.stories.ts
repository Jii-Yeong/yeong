import type { Meta, StoryObj } from '@storybook/react';
import ProfileImage from './ProfileImage';
import defaultProfileImage from 'public/images/users/default-profile-image.webp';

const meta = {
  title: 'UI/Image/ProfileImage',
  component: ProfileImage,
  parameters: {
    layout: 'centered',
  },

} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: defaultProfileImage
  },
};