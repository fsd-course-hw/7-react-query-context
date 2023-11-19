import { createStrictContext, useStrictContext } from "@/shared/lib/react";

export type BoardSearchStore = {
  query: string;
  submittedQuery: string;
  setQuery: (newQuery: string) => void;
  submitQuery: () => void;
  resetQuery: () => void;
};

export const boardSearchStoreContext = createStrictContext<BoardSearchStore>();

export const useBoardSearchStore = () => useStrictContext(boardSearchStoreContext);
