import { USERS_QUERY_KEY } from "@/constants/query-key.constants";
import { queryClient } from "@/lib/react-query";
import { loginByGoogle } from "@/repository/auth.repository";
import { useMutation } from "@tanstack/react-query";
import Cookies from 'js-cookie';

export const loginByGoogleMutation = () => {
  return useMutation({
    mutationFn: loginByGoogle,
    onSuccess: (res) => {
      Cookies.set('access_token', String(res.accessToken), {
        sameSite: 'Strict',
        expires: 1,
        secure: true,
      })
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
    }
  })
}