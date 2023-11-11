import { tasksApi } from "@/shared/api/modules/task";
import { UseQueryOptions, useQueryClient } from "@tanstack/react-query";

const taskQueryKey = "task";

export const tasksListQuery = () =>
  ({
    queryKey: [taskQueryKey, "list"],
    queryFn: () => tasksApi.getTasks(),
  }) satisfies UseQueryOptions;

export const taskByIdQuery = (id: string) =>
  ({
    queryKey: [taskQueryKey, "byId", id],
    queryFn: () => tasksApi.getTask(id).then((r) => r ?? null),
  }) satisfies UseQueryOptions;

export const useInvalidateTasks = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [taskQueryKey],
    });
};
