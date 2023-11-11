import { useSesssion } from "@/entities/session";
import { tasksApi } from "@/shared/api/modules/task";
import { useMutation } from "@tanstack/react-query";
import { UpdateTaskFormData } from "./types";
import { useInvalidateTasks } from "@/entities/task";

export function useUpdateTask(taskId: string) {
  const session = useSesssion();
  const invaliteTasks = useInvalidateTasks();

  const mutation = useMutation({
    mutationFn: tasksApi.updateTask,
    async onSettled() {
      await invaliteTasks();
    },
  });

  return (formData: UpdateTaskFormData) => {
    if (!session) return;

    return mutation.mutateAsync({
      id: taskId,
      ...formData,
    });
  };
}
