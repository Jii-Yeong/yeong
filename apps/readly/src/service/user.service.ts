import { USERS_QUERY_KEY } from "@/constants/query-key.constants"
import { getUserInfoData } from "@/repository/user.repository"
import { useQuery } from "@tanstack/react-query"

export const getUserInfoQuery = () => {
  return useQuery({ queryKey: [USERS_QUERY_KEY], queryFn: getUserInfoData })
}