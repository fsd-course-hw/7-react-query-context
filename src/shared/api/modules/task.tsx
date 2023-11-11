import { nanoid } from "nanoid";
import { persistStorage } from "@/shared/lib/persist-storage";

export type TaskDto = {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string;
  authorId: string;
};

export type CreateTaskDto = {
  title: string;
  description?: string;
  assigneeId?: string;
  authorId: string;
};

export type UpdateTaskDto = {
  id: string;
  title?: string;
  authorId?: string;
  description?: string;
  assigneeId?: string;
};

const TASKS_STORAGE_KEY = "tasks_storsage";

export const tasksApi = {
  getTasks: async (): Promise<TaskDto[]> => {
    return persistStorage.getItemSafe<TaskDto[]>(TASKS_STORAGE_KEY, []);
  },
  getTask: async (id: string): Promise<TaskDto | undefined> => {
    return persistStorage
      .getItemSafe<TaskDto[]>(TASKS_STORAGE_KEY, [])
      .then((tasks) => tasks.find((task) => task.id === id));
  },
  addTask: async (createTask: CreateTaskDto) => {
    const tasks = await tasksApi.getTasks();

    const newTask = { id: nanoid(), ...createTask };
    tasks.push(newTask);

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);
    return newTask;
  },
  updateTask: async (value: UpdateTaskDto) => {
    const tasks = await tasksApi.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === value.id);

    if (taskIndex === -1) {
      return;
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...value };

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks);

    return tasks[taskIndex];
  },

  removeTask: async (taskId: string) => {
    const tasks = await tasksApi.getTasks();
    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter((task) => task.id !== taskId),
    );
  },

  removeUserTasks: async (userId: string) => {
    const tasks = await tasksApi.getTasks();
    const tasksToRemove = tasks.filter((task) => task.authorId === userId);

    for (const task of tasksToRemove) {
      await tasksApi.removeTask(task.id);
    }
  },
};
