import { useGetConfirmation } from "@/shared/lib/confirmation";
import { BoardAccessInfo } from "./types";
import { useSesssion } from "@/entities/session";
import { useMutation } from "@tanstack/react-query";
import { boardsApi } from "@/shared/api/modules/board";
import { useInvalidateBoardByID } from "@/entities/board";

export type UpdateBoardAccessData = {
  editorsIds?: string[];
  ownerId: string;
};

export function useUpdateBoardAccess(boardId: string) {
  const invalidateBoard = useInvalidateBoardByID();
  const getConfirmation = useGetConfirmation();
  const session = useSesssion();

  const updateBoardMutation = useMutation({
    mutationFn: boardsApi.updateBoard,
    onSuccess: async (_, { id }) => {
      await invalidateBoard(id);
    },
  });

  return async (
    data: UpdateBoardAccessData,
    onUpdate: (boardAccessInfo: BoardAccessInfo) => void,
  ) => {
    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateBoardMutation.mutateAsync({ id: boardId, ...data });
    onUpdate({ id: boardId, ...data });
  };
}
