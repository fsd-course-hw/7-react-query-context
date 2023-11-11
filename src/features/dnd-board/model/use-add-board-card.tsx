import { useSesssion } from "@/entities/session";
import { useInvalidateTasks } from "@/entities/task";
import { tasksApi } from "@/shared/api/modules/task";
import { useMutation } from "@tanstack/react-query";
import { BoardCard } from "./types";

export function useAddBoardCard() {
  const sesson = useSesssion();
  const invaliateTasks = useInvalidateTasks();

  const addTaskMutation = useMutation({
    mutationFn: tasksApi.addTask,
    onSettled: async () => {
      await invaliateTasks();
    },
  });

  return (boardCardTitle: string): Promise<BoardCard> => {
    if (!sesson) {
      throw new Error();
    }

    return addTaskMutation.mutateAsync({
      title: boardCardTitle,
      authorId: sesson.userId,
    });
  };
}
