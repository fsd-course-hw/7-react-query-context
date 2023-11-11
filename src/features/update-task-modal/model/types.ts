export type Task = {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  authorId: string;
};

export type UpdateTaskFormData = {
  title: string;
  description?: string;
  assigneeId?: string;
};
