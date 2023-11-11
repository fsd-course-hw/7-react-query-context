import { useSesssion } from "@/entities/session";
import { useBoardsListDeps } from "../deps";
import { useMutation } from "@tanstack/react-query";
import { boardsApi } from "@/shared/api/modules/board";
import { useInvaliateBoardsList } from "@/entities/board";
import { CreateBoardFormData } from "./types";

export function useCreateBoard() {
  const invalidateList = useInvaliateBoardsList();
  const session = useSesssion();

  const createBoardMutation = useMutation({
    mutationFn: boardsApi.createBoard,
    async onSettled() {
      await invalidateList();
    },
  });

  const { canCreateBoard } = useBoardsListDeps();

  const createBoard = async (
    data: CreateBoardFormData,
    onCreate: () => void,
  ) => {
    if (!canCreateBoard() || !session?.userId) return;

    createBoardMutation.mutate(
      { ...data, ownerId: session.userId },
      {
        onSuccess: () => onCreate(),
      },
    );
  };

  return { createBoard };
}
