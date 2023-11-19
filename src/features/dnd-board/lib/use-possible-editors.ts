import { useQuery } from '@tanstack/react-query';
import { usersListQuery} from '@/entities/user';
import { BoardUser } from "../model/types.tsx"
import { useCanBeAssignedAsEditor } from "./use-can-be-assigned-as-editor.ts";

export const usePossibleEditors = ({ editorsIds }: { editorsIds: string[]}): BoardUser[] => {
  const { data: users } = useQuery({
    ...usersListQuery(),
    initialData: [],
  });

  const canBeAssignedAsEditor = useCanBeAssignedAsEditor({ editorsIds })

  return users.filter((user) => canBeAssignedAsEditor(user))
}
