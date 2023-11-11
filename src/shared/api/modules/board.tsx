import { persistStorage } from "@/shared/lib/persist-storage";
import { nanoid } from "nanoid";

export type BoardPartialDto = {
  id: string;
  title: string;
  ownerId: string;
  editorsIds: string[];
};

export type BoardDto = {
  id: string;
  title: string;
  cols: BoardColDto[];
  ownerId: string;
  editorsIds: string[];
};

export type BoardColDto = {
  id: string;
  title: string;
  taskIds: string[];
};

export type CreateBoardDto = {
  title: string;
  ownerId: string;
  editorsIds: string[];
};

export type UpdateBoardDto = {
  title?: string;
  ownerId?: string;
  editorsIds?: string[];
  cols?: BoardColDto[];
};

const BOARDS_STORAGE_KEY = "boards_storsage";
export const boardsApi = {
  getBoards: async (): Promise<BoardPartialDto[]> => {
    return persistStorage.getItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, []);
  },
  getBoard: async (id: string): Promise<BoardDto | undefined> => {
    return persistStorage
      .getItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, [])
      .then((boards) => boards.find((board) => board.id === id));
  },
  createBoard: async (value: CreateBoardDto) => {
    const boards = (await boardsApi.getBoards()) as BoardDto[];

    boards.push({ ...value, cols: [], id: nanoid() });

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);
  },
  updateBoard: async (path: Partial<UpdateBoardDto> & { id: string }) => {
    const boards = (await boardsApi.getBoards()) as BoardDto[];
    const boardIndex = boards.findIndex((board) => board.id === path.id);

    if (boardIndex === -1) {
      return;
    } else {
      boards[boardIndex] = { ...boards[boardIndex], ...path };
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);
  },
  saveBoard: async (value: BoardDto) => {
    const boards = await boardsApi.getBoards();
    const boardIndex = boards.findIndex((board) => board.id === value.id);

    if (boardIndex === -1) {
      boards.push(value);
    } else {
      boards[boardIndex] = value;
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards);
  },
  removeBoard: async (boardId: string) => {
    const boards = await boardsApi.getBoards();
    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.filter((board) => board.id !== boardId),
    );
  },
  // private
  removeAuthorFromBoards: async (userId: string) => {
    for (const board of await boardsApi.getBoards()) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      if (newBoard.ownerId === userId) {
        await boardsApi.removeBoard(newBoard.id);
      } else {
        await boardsApi.updateBoard(newBoard);
      }
    }
  },
};
