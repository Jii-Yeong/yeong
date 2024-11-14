import { MY_USERS_QUERY_KEY, USERS_QUERY_KEY } from "@/constants/query-key.constants"
import { queryClient } from "@/lib/react-query"
import { editUserNickname, editUserProfileImage, getUserInfoData, getUserMyInfoData } from "@/repository/user.repository"
import { useMutation, useQuery } from "@tanstack/react-query"

export const getUserInfoQuery = (id: string) => {
  return useQuery({ queryKey: [USERS_QUERY_KEY, id], queryFn: () => getUserInfoData(id) })
}


export const getUserMyInfoQuery = () => {
  return useQuery({ queryKey: [MY_USERS_QUERY_KEY], queryFn: getUserMyInfoData })
}


export const editUserNicknameMutation = () => {
  return useMutation({
    mutationFn: editUserNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    }
  })
}

export const editUserProfileImageMutation = () => {
  return useMutation({
    mutationFn: editUserProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    }
  })
}