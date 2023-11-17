import { boardsApi } from "@/shared/api/modules/board";
import { useQueryClient } from "@tanstack/react-query";

const boardQueryKey = "board";

export const boardsListQuery = () => ({
  queryKey: [boardQueryKey, "list"],
  queryFn: () => {
    return boardsApi.getBoards();
  },
});

export const boardByIdQuery = (id: string) => ({
  queryKey: [boardQueryKey, "byId", id],
  queryFn: () => boardsApi.getBoard(id).then((r) => r ?? null),
});

export const useInvaliateBoardsList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [boardQueryKey, "list"],
    });
};

export const useInvalidateBoardByID = () => {
  const queryClient = useQueryClient();

  return async (id: string) => {
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: [boardQueryKey, "list"],
      }),
      queryClient.invalidateQueries({
        queryKey: [boardQueryKey, "byId", id],
      }),
    ]);
  };
};
