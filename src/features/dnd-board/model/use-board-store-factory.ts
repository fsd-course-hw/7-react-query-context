import { useEventCallback, useStrictContext } from "@/shared/lib/react";
import { Board, BoardCard } from "./types";
import { useGetConfirmation } from "@/shared/lib/confirmation";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { boardDepsContext, useSaveBoard } from "..";
import { useRemoveBoardCard } from "./use-remove-board-card";
import { useAddBoardCard } from "./use-add-board-card";
import { BoardStore } from "./use-board-store";

export type BoardCardStore = {
  updateBoardCard: (boardCard: BoardCard) => Promise<BoardCard | undefined>;
};

export const useBoardStoreFactory = (initalBoard: Board): BoardStore => {
  const saveBoard = useSaveBoard();
  const getConfirmation = useGetConfirmation();
  const itemStore = useStrictContext(boardDepsContext);
  const addBoardCardAsync = useAddBoardCard();
  const removeBoardCardAsync = useRemoveBoardCard();

  const [board, setBoard] = useState<Board>(initalBoard);

  const saveBoardCallback = useEventCallback(saveBoard);

  useEffect(() => {
    saveBoardCallback(board);
  }, [board, saveBoardCallback]);

  const addColumn = async (title: string) => {
    setBoard(
      produce((draft) => {
        draft.cols.push({ id: nanoid(), title: title, items: [] });
      }),
    );
  };

  const updateColumn = async (id: string, title: string) => {
    setBoard(
      produce((draft) => {
        const index = draft.cols.findIndex((col) => col.id === id);
        draft.cols[index].title = title;
      }),
    );
  };

  const removeColumn = async (id: string) => {
    const confirmation = await getConfirmation({
      title: "Удаление колонки",
      description: "Вы уверены, что хотите удалить эту колонку?",
    });

    if (!confirmation) {
      return;
    }

    setBoard(
      produce((draft) => {
        const index = draft.cols.findIndex((col) => col.id === id);
        draft.cols.splice(index, 1);
      }),
    );
  };

  const moveColumn = async (index: number, newIndex: number) => {
    setBoard(
      produce((draft) => {
        const col = draft.cols[index];
        draft.cols.splice(index, 1);
        draft.cols.splice(newIndex, 0, col);
      }),
    );
  };

  const addBoardCard = async (colId: string, title: string) => {
    const boardCard = await addBoardCardAsync(title);

    setBoard(
      produce((draft) => {
        const index = draft.cols.findIndex((col) => col.id === colId);
        draft.cols[index].items.push(boardCard);
      }),
    );
  };

  const updateBoardCard = async (colId: string, boardCard: BoardCard) => {
    const newBoardCard = await itemStore.updateBoardCard(boardCard);
    if (!newBoardCard) {
      return;
    }

    setBoard(
      produce((draft) => {
        const index = draft.cols.findIndex((col) => col.id === colId);
        const itemIndex = draft.cols[index].items.findIndex(
          (item) => item.id === boardCard.id,
        );
        draft.cols[index].items[itemIndex] = newBoardCard;
      }),
    );
  };

  const removeBoardCard = async (colId: string, boardCardId: string) => {
    const confirmation = await getConfirmation({
      title: "Удаление карточки",
      description: "Вы уверены, что хотите удалить карточку?",
    });

    if (!confirmation) {
      return;
    }

    removeBoardCardAsync(boardCardId);

    setBoard(
      produce((draft) => {
        const index = draft.cols.findIndex((col) => col.id === colId);
        const itemIndex = draft.cols[index].items.findIndex(
          (item) => item.id === boardCardId,
        );
        draft.cols[index].items.splice(itemIndex, 1);
      }),
    );
  };

  const moveBoardCard: BoardStore["moveBoardCard"] = async (start, end) => {
    setBoard(
      produce((draft) => {
        const startColIndex = draft.cols.findIndex(
          (col) => col.id === start.colId,
        );
        const endColIndex = draft.cols.findIndex((col) => col.id === end.colId);
        const item = draft.cols[startColIndex].items[start.index];
        draft.cols[startColIndex].items.splice(start.index, 1);
        draft.cols[endColIndex].items.splice(end.index, 0, item);
      }),
    );
  };

  return {
    board,
    addColumn,
    updateColumn,
    removeColumn,
    moveColumn,
    removeBoardCard,
    updateBoardCard,
    moveBoardCard,
    addBoardCard,
  };
};
