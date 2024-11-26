import { UserProfileDto } from "./user-profile.dto"

export type UserProfileModel = UserProfileDto

export const initUserProfile = (): UserProfileModel => {
  return {
    id: "",
    created_at: "",
    user_image: "",
    user_name: "",
  }
}
