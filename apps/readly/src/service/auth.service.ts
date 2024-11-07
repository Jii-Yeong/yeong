import { USERS_QUERY_KEY } from '@/constants/query-key.constants';
import { queryClient } from '@/lib/react-query';
import {
  loginByDefault,
  loginByGoogle,
  signUpByDefault,
} from '@/repository/auth.repository';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const loginByGoogleMutation = () => {
  return useMutation({
    mutationFn: loginByGoogle,
    onSuccess: (res) => {
      Cookies.set('access_token', String(res.accessToken), {
        sameSite: 'Strict',
        expires: 1,
        secure: true,
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

export const signUpByDefaultMutation = () => {
  return useMutation({
    mutationFn: signUpByDefault,
  });
};

export const loginByDefaultMutation = () => {
  return useMutation({
    mutationFn: loginByDefault,
    onSuccess: (res) => {
      if (!res.isSuccess) return;
      Cookies.set('access_token', String(res.accessToken), {
        sameSite: 'Strict',
        expires: 1,
        secure: true,
      });
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};
