interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

type createTaskType = Omit<ITask, "id">;

export type {ITask, createTaskType}