import { readlyApiAxiosInstance } from "@/api/readly-api"
import { UserInfoDto } from "@/model/user.dto"

export const getUserInfoData = async (): Promise<UserInfoDto> => {
  const { data } = await readlyApiAxiosInstance().get('/user/info')
  return data
}