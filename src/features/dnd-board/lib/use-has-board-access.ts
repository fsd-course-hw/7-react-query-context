import { useSesssion as useSession } from "@/entities/session";
import { useBoardStore } from "../model/use-board-store";

export const hasBoardAccess = (userId: string, {ownerId, editorsIds}: {ownerId: string, editorsIds: string[]}): boolean => {
  const isOwner = ownerId === userId;

  if (isOwner) {
    return true;
  }

  const isEditor = editorsIds.some((editorId) => editorId === userId);

  return isEditor;
}

export const useHasBoardAccess = (): boolean => {
  const { board } = useBoardStore();
  const session = useSession();

  if (!session) {
    return false;
  }

  return hasBoardAccess(session.userId, board);
}