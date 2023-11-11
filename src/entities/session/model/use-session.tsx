import { useQuery } from "@tanstack/react-query";
import { sessionQuery } from "../queries";
import { Session } from "./types";

export const useSesssion = (): Session | undefined => {
  const { data } = useQuery({
    ...sessionQuery(),
  });

  return data ?? undefined;
};
