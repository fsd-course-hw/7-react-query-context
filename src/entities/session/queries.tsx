import { authApi } from "@/shared/api/modules/auth";
import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";

const sessionQueryKey = "session";

export const sessionQuery = () =>
  ({
    queryKey: [sessionQueryKey, "getSession"],
    queryFn: () => authApi.getSession().then((r) => r ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateSession = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [sessionQueryKey],
    });
};
