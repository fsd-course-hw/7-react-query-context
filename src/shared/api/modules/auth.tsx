import { persistStorage } from "@/shared/lib/persist-storage";
import { usersApi } from "./user";
import { nanoid } from "nanoid";

export type SessionDto = {
  id: string;
  name: string;
  avatarId: string;
  userId: string;
};
const SESSION_STORAGE_KEY = "session_storage";
export const authApi = {
  getSession: () => {
    return persistStorage.getItemSafe<SessionDto | undefined>(
      SESSION_STORAGE_KEY,
      undefined,
    );
  },

  signInAsUser: async (userId: string) => {
    const users = await usersApi.getUsers();

    const user = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error();
    }

    const session: SessionDto = {
      ...user,
      userId: user.id,
      id: nanoid(),
    };

    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, session);
  },

  signOut: async () => {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, undefined);
  },
};
