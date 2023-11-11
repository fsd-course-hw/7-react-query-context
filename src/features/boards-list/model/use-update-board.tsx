import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useBoardsListDeps } from "../deps";
import { useSesssion } from "@/entities/session";
import { useMutation } from "@tanstack/react-query";
import { boardsApi } from "@/shared/api/modules/board";
import { BoardPartial, UpdateBoardFormData } from "./types";
import { useInvaliateBoardsList } from "@/entities/board";

export function useUpdateBoard(board?: BoardPartial) {
  const getConfirmation = useGetConfirmation();
  const { canUpdateBoard } = useBoardsListDeps();
  const invalidateList = useInvaliateBoardsList();

  const session = useSesssion();

  const updateBoardMutation = useMutation({
    mutationFn: boardsApi.updateBoard,
    async onSettled() {
      await invalidateList();
    },
  });

  const updateBoard = async (
    data: UpdateBoardFormData,
    onUpdate: () => void,
  ) => {
    if (!board || !canUpdateBoard(board)) return;

    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    updateBoardMutation.mutate(
      {
        id: board.id,
        ...data,
      },
      {
        onSuccess: () => onUpdate(),
      },
    );
  };

  return { updateBoard };
}
