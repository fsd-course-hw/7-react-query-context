import { Board } from "../model/types";
import { useBoardStore} from "../model/use-board-store";
import { useBoardSearchStore } from "../model/use-board-search-store";

export const useShownBoard = (): Board => {
  const { board} = useBoardStore();
  const { submittedQuery: query } = useBoardSearchStore();

  if (!query) {
    return board;
  }

  const loweredQuery = query.toLowerCase();

  const shownBoardCols = board.cols.map(({ items, ...restCol }) => ({
    ...restCol,
    items: items.filter((item) => item.title.toLowerCase().includes(loweredQuery))
  }));

  return {
    ...board,
    cols: shownBoardCols,
  }
}