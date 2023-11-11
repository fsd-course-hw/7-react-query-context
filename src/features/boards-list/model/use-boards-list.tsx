import { useQuery } from "@tanstack/react-query";
import { boardsListQuery } from "@/entities/board";
import { usersListQuery } from "@/entities/user";
import { listToRecord } from "@/shared/lib/record";

export function useBoardsList() {
  const { data: usersMap = {} } = useQuery({
    ...usersListQuery(),
    select: listToRecord,
  });

  const { data: boards } = useQuery({
    ...boardsListQuery(),
    initialData: [],
  });

  return boards.map((board) => ({
    ...board,
    owner: usersMap[board.ownerId],
    editors: board.editorsIds.map((id) => usersMap[id]),
  }));
}
