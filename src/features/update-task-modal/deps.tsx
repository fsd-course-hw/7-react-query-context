// task edidor deps

import { createStrictContext } from "@/shared/lib/react";

type UpdateTaskModalDeps = {
  canAssigneUserToTask: (user: { id: string }) => boolean;
};

export const updateTaskModalDeps = createStrictContext<UpdateTaskModalDeps>();
