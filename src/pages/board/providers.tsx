import { usersListQuery } from "@/entities/user";
import {
  BoardType,
  boardDepsContext,
  boardStoreContext,
  useBoardStoreFactory,
} from "@/features/dnd-board";
import {
  updateTaskModalDeps,
  useUpdateTaskModal,
} from "@/features/update-task-modal";
import { listToRecord } from "@/shared/lib/record";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

export function TaskEditorProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: BoardType;
}) {
  return (
    <updateTaskModalDeps.Provider
      value={{
        canAssigneUserToTask: (user) =>
          board.ownerId === user.id || board.editorsIds.includes(user.id),
      }}
    >
      {children}
    </updateTaskModalDeps.Provider>
  );
}

export function BoardDepsProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { modal, updateTask } = useUpdateTaskModal();
  const { data: usersMap } = useQuery({
    ...usersListQuery(),
    select: listToRecord,
  });

  return (
    <boardDepsContext.Provider
      value={{
        updateBoardCard: async (board) => {
          const task = await updateTask(board.id);
          if (!task || !usersMap) return;

          return {
            id: task.id,
            title: task.title,
            assignee: task.assigneeId ? usersMap[task.assigneeId] : undefined,
          };
        },
      }}
    >
      {children}
      {modal}
    </boardDepsContext.Provider>
  );
}

export const BoardStoreProvider = memo(function BoardStoreProvider({
  children,
  board,
}: {
  children?: React.ReactNode;
  board: BoardType;
}) {
  const boardStore = useBoardStoreFactory(board);
  return (
    <boardStoreContext.Provider value={boardStore}>
      {children}
    </boardStoreContext.Provider>
  );
});
