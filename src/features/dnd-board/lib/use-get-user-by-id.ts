import { useQuery } from "@tanstack/react-query";
import { UserDto } from '@/shared/api/modules/user';
import { usersListQuery } from '@/entities/user';

export function useGetUserById(): (userId: string) => UserDto | null {
  const { data: users } = useQuery({
    ...usersListQuery(),
    initialData: [],
  });

  return (userId) => users.find((user) => user.id === userId) ?? null;
}