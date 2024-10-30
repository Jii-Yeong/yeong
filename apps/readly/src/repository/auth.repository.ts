import { readlyApiAxiosInstance } from "@/api/readly-api"
import { LoginByGoogleResponse } from "@/model/auth.dto"

export const loginByGoogle = async (code: string): Promise<LoginByGoogleResponse> => {
  const { data } = await readlyApiAxiosInstance().post('/auth/login', { code })
  return data
}