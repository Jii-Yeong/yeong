import { getUserMyInfoQuery } from '@/service/user.service';

export const useAuth = () => {
  const { data, isPending, isError } = getUserMyInfoQuery();

  return {
    isLoggedIn: !isError && Boolean(data),
    isAuthLoading: isPending,
  };
};
