import { useInvaliateUsersList } from "@/entities/user";
import { usersApi } from "@/shared/api/modules/user";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};

export function useCreateUser() {
  const invalidateUsers = useInvaliateUsersList();

  const createUserMutation = useMutation({
    mutationFn: usersApi.addUser,
    async onSettled() {
      await invalidateUsers();
    },
  });

  return (data: CreateUserFormData) => {
    createUserMutation.mutate({ ...data, id: nanoid() });
  };
}
