import { useQuery } from "@tanstack/react-query";
import { taskByIdQuery } from "@/entities/task";
import { Task } from "./types";

export function useTask(id: string): Task | undefined {
  const { data: task } = useQuery({
    ...taskByIdQuery(id),
  });

  return task ?? undefined;
}
