import { boardsApi } from "@/shared/api/modules/board";
import { useMutation } from "@tanstack/react-query";
import { Board } from "./types";

export function useSaveBoard() {
  const saveBoardMutation = useMutation({
    mutationFn: boardsApi.saveBoard,
  });

  return (board: Board) => {
    saveBoardMutation.mutate({
      ...board,
      cols: board.cols.map((col) => ({
        ...col,
        taskIds: col.items.map((item) => item.id),
        items: undefined,
      })),
    });
  };
}
