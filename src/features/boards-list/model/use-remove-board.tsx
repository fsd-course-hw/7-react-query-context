import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useInvaliateBoardsList } from "@/entities/board";
import { useBoardsListDeps } from "../deps";
import { useMutation } from "@tanstack/react-query";
import { boardsApi } from "@/shared/api/modules/board";
import { BoardPartial } from "./types";

export function useRemoveBoard() {
  const invalidateList = useInvaliateBoardsList();

  const removeBoardMutation = useMutation({
    mutationFn: boardsApi.removeBoard,
    async onSettled() {
      await invalidateList();
    },
  });

  const getConfirmation = useGetConfirmation();
  const { canRemoveBoard } = useBoardsListDeps();

  return async (board: BoardPartial) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (!confirmation || !canRemoveBoard(board)) return;

    removeBoardMutation.mutate(board.id);
  };
}
