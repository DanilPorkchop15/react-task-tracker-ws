interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

type CreateTask= Omit<Task, "id">;

export type { Task, CreateTask };
