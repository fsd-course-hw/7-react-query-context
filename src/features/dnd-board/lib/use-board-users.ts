import { BoardUser } from "../model/types.tsx"
import { useBoardStore } from "../model/use-board-store";
import { useGetUserById } from "./use-get-user-by-id";

type UseBoardUsersReturn = {
  owner: BoardUser | null;
  editors: BoardUser[]
}

export const useBoardUsers = (): UseBoardUsersReturn => {
  const { board } = useBoardStore();
  const { ownerId, editorsIds} = board;

  const getUserById = useGetUserById();

  const owner = getUserById(ownerId) ?? null;

  const editors: BoardUser[] = []

  editorsIds.forEach((id) => {
    const editor = getUserById(id);

    if (editor) {
      editors.push(editor)
    }
  })

  return {
    owner,
    editors
  }
}