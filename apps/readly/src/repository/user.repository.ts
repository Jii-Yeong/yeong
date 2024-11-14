import { readlyApiAxiosInstance } from "@/api/readly-api"
import { EditUserNicknameRequest, UserInfoDto } from "@/model/user.dto"

export const getUserInfoData = async () => {
  const { data } = await readlyApiAxiosInstance().get<UserInfoDto>('/user/info')
  return data
}

export const editUserNickname = async (params: EditUserNicknameRequest) => {
  await readlyApiAxiosInstance().put('/user/edit/nickname', params)
}

export const editUserProfileImage = async (params: FormData) => {
  await readlyApiAxiosInstance().post('/user/edit/profile-image', params, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}