import { CreateTaskType, ITask } from "../types/Task.types";
import { BASE_URL } from "../utils/constants";

export async function fetchTasks(): Promise<ITask[]> {
  try {
    const res: Response = await fetch(`${BASE_URL}/todos`);
    if (res.ok) {
      return res.json() as Promise<ITask[]>;
    } else {
      throw new Error(`Fetching tasks failed with ${res.status} ${res.statusText}`);
    }
  } catch (e) {
    console.log("Fetch error: ", e);
    throw e;
  }
}

export async function addTask(task: CreateTaskType): Promise<ITask> {
  try {
    const res: Response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        title: task.title,
        completed: task.completed,
        userId: task.userId,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return res.json() as Promise<ITask>;
  } catch (e) {
    console.log("Add task error: ", e);
    throw e;
  }
}