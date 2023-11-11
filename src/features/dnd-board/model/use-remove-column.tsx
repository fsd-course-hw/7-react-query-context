import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useBoardStore } from "..";
import { BoardCol } from "./types";

export function useRemoveColumn(col: BoardCol) {
  const getConfirmation = useGetConfirmation();
  const { removeColumn } = useBoardStore();

  return async () => {
    const confirmatin = await getConfirmation({
      title: "Удаление колонки",
      description: "Вы уверены, что хотите удалить эту колонку?",
    });

    if (!confirmatin) {
      return;
    }

    removeColumn(col.id);
  };
}
