import { usersListQuery } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { User } from "./types";

export function useUsersList(): User[] {
  const { data: users } = useQuery({
    ...usersListQuery(),
    initialData: [],
  });

  return users;
}
