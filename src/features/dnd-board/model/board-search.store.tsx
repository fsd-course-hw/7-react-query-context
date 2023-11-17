import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import { useState } from "react";

type BoardSearch = {
  query: string;
  setQuery: (query: string) => void;
};

const searchBoardContext = createStrictContext<BoardSearch>();

export function BoardSearchProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [query, setQuery] = useState<string>("");
  return (
    <searchBoardContext.Provider value={{ query, setQuery }}>
      {children}
    </searchBoardContext.Provider>
  );
}

export const useBoardSearch = () => {
  return useStrictContext(searchBoardContext);
};
