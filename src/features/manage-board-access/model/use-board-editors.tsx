import { usersListQuery } from "@/entities/user";
import { BoardAccessInfo } from "./types";
import { useQuery } from "@tanstack/react-query";
import { listToRecord } from "@/shared/lib/record";

export function useBoardEditors(board: BoardAccessInfo) {
  const { data: usersMap } = useQuery({
    ...usersListQuery(),
    initialData: [],
    select: listToRecord,
  });

  const editors = board.editorsIds?.map((id) => usersMap[id]);
  const editorsWithOwner = board
    ? Array.from(new Set([board.ownerId, ...(board?.editorsIds ?? [])])).map(
        (id) => usersMap[id],
      )
    : undefined;

  const owner = board?.ownerId ? usersMap[board?.ownerId] : undefined;

  return { editors, editorsWithOwner, owner };
}
