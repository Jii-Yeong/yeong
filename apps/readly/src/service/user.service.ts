import { USERS_QUERY_KEY } from "@/constants/query-key.constants"
import { queryClient } from "@/lib/react-query"
import { editUserNickname, editUserProfileImage, getUserInfoData } from "@/repository/user.repository"
import { useMutation, useQuery } from "@tanstack/react-query"

export const getUserInfoQuery = () => {
  return useQuery({ queryKey: [USERS_QUERY_KEY], queryFn: getUserInfoData })
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