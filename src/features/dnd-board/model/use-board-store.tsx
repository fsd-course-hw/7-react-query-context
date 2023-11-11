import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { Board, BoardCard } from "./types";

export type BoardStore = {
  board: Board;

  addColumn: (title: string) => Promise<void>;
  updateColumn: (id: string, title: string) => Promise<void>;
  removeColumn: (id: string) => Promise<void>;
  moveColumn: (index: number, newIndex: number) => Promise<void>;

  addBoardCard: (colId: string, title: string) => Promise<void>;
  updateBoardCard: (colId: string, boardCard: BoardCard) => Promise<void>;
  removeBoardCard: (colId: string, boardCardId: string) => Promise<void>;
  moveBoardCard: (
    start: { colId: string; index: number },
    end: { colId: string; index: number },
  ) => Promise<void>;
};

export const boardStoreContext = createStrictContext<BoardStore>();

export const useBoardStore = () => useStrictContext(boardStoreContext);
