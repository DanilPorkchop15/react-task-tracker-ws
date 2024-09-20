interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

type CreateTaskType = Omit<ITask, "id">;

export type {ITask, CreateTaskType}