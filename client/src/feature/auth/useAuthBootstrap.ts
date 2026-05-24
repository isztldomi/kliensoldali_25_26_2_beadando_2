import { useMeQuery } from "@/feature/auth/authApi";

export const useAuthBootstrap = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
  };
};
