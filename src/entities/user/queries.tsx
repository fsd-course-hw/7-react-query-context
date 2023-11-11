import { usersApi } from "@/shared/api/modules/user";
import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";

const userQueryKey = "user";

export const usersListQuery = () =>
  ({
    queryKey: [userQueryKey, "list"],
    queryFn: () => usersApi.getUsers(),
  }) satisfies UseQueryOptions;

export const useInvaliateUsersList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [userQueryKey, "list"],
    });
};
