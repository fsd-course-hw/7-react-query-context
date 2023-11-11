import { UiModal } from "@/shared/ui/ui-modal";
import { UiButton } from "@/shared/ui/ui-button";
import { UpdateTaskForm } from "./update-task-form";
import { useTask } from "../model/use-task";
import { Task } from "../model/types";

export function UpdateTaskModal({
  onClose,
  taskId,
}: {
  onClose: (task?: Task) => void;
  taskId: string;
}) {
  const task = useTask(taskId);

  if (!task) return;

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <UpdateTaskForm onSuccess={onClose} task={task}>
        <UiModal.Header>
          <h1>Редактирование задачи</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <UpdateTaskForm.Fields />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={() => onClose()}>
            Отмена
          </UiButton>
          <UpdateTaskForm.SubmitButton />
        </UiModal.Footer>
      </UpdateTaskForm>
    </UiModal>
  );
}
