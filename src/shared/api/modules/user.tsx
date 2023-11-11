import { persistStorage } from "@/shared/lib/persist-storage";
import { tasksApi } from "./task";
import { authApi } from "./auth";
import { boardsApi } from "./board";

export type UserDto = {
  id: string;
  name: string;
  avatarId: string;
};

const USERS_STORAGE_KEY = "users_storsage";
export const usersApi = {
  getUsers: () => {
    return persistStorage.getItemSafe<UserDto[]>(USERS_STORAGE_KEY, []);
  },
  addUser: async (value: UserDto) => {
    const users = await usersApi.getUsers();
    await persistStorage.setItemSafe(USERS_STORAGE_KEY, users.concat([value]));
  },
  removeUser: async (userId: string) => {
    const users = await usersApi.getUsers();

    await tasksApi.removeUserTasks(userId);
    await boardsApi.removeAuthorFromBoards(userId);

    const session = await authApi.getSession();

    if (session?.userId === userId) {
      await authApi.signOut();
    }

    await persistStorage.setItemSafe(
      USERS_STORAGE_KEY,
      users.filter((user) => user.id !== userId),
    );
  },
};
