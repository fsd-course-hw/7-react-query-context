import { useQuery } from "@tanstack/react-query";
import { boardByIdQuery } from "@/entities/board";
import { tasksListQuery } from "@/entities/task";
import { useMemo } from "react";
import { Board } from "./types";
import { usersListQuery } from "@/entities/user";
import { listToRecord } from "@/shared/lib/record";

export function useBoard(boardId?: string): Board | undefined {
  const { data: users } = useQuery({
    ...usersListQuery(),
  });

  const { data: tasks } = useQuery({
    ...tasksListQuery(),
  });

  const { data: board } = useQuery({
    ...boardByIdQuery(boardId!),
    enabled: !!boardId,
  });

  return useMemo(() => {
    if (!tasks || !board || !users) {
      return;
    }

    const tasksMap = listToRecord(tasks);
    const usersMap = listToRecord(users);

    return {
      ...board,
      cols: board.cols.map((col) => {
        return {
          ...col,
          items: col.taskIds.map((taskId) => {
            const task = tasksMap[taskId];

            return {
              ...task,
              assignee: task.assigneeId ? usersMap[task.assigneeId] : undefined,
            };
          }),
        };
      }),
    };
  }, [board, tasks, users]);
}
