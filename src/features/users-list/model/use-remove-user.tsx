import { useGetConfirmation } from "@/shared/lib/confirmation";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "@/shared/api/modules/user";
import { useInvaliateUsersList } from "@/entities/user";
import { useInvalidateSession } from "@/entities/session";

export function useRemoveUser() {
  const invalidateUsers = useInvaliateUsersList();
  const invalidateSession = useInvalidateSession();

  const removeUserMutation = useMutation({
    mutationFn: usersApi.removeUser,
    async onSettled() {
      await invalidateSession();
      await invalidateUsers();
    },
  });

  const getConfirmation = useGetConfirmation();

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    await removeUserMutation.mutateAsync(userId);
  };
}
