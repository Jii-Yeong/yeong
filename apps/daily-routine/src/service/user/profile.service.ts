import {
  UserProfileDto,
  UserProfileReqDto,
} from "@/model/user/user-profile.dto"
import {
  getUserProfile,
  updateUserProfile,
} from "@/repository/user/profile.repository"

export const selectUserProfileService = async (id: UserProfileDto["id"]) => {
  const data = await getUserProfile(id)
  return data
}

export const updateUserProfileService = async (
  id: UserProfileDto["id"],
  profile: UserProfileReqDto
) => {
  await updateUserProfile(id, profile)
}
