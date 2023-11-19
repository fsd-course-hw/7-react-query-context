import { useSesssion as useSession} from "@/entities/session";
import { useBoardStore } from "../model/use-board-store";

export const useCanUpdateBoardEditors = (): boolean => {
  const { board } = useBoardStore();
  const { ownerId} = board;
  const session = useSession();

  if (!session) {
    return false;
  }

  const { userId} = session;

  const isOwner = ownerId === userId;

  return isOwner;
}