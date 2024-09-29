import { CreateTask, Task } from "../types/Task.types";
import { BASE_URL } from "../utils/constants";

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res: Response = await fetch(`${BASE_URL}/todos`);
    if (res.ok) {
      return res.json() as Promise<Task[]>;
    } else {
      throw new Error(
        `Fetching tasks failed with ${res.status} ${res.statusText}`
      );
    }
  } catch (e) {
    console.log("Fetch error: ", e);
    throw e;
  }
}

export async function addTask(task: CreateTask): Promise<Task> {
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
    return res.json() as Promise<Task>;
  } catch (e) {
    console.log("Add task error: ", e);
    throw e;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    const res: Response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return;
    } else {
      throw new Error(
        `Deleting task failed with ${res.status} ${res.statusText}`
      );
    }
  } catch (e) {
    console.log("Delete task error: ", e);
    throw e;
  }
}

export async function updateTask(task: Task): Promise<Task> {
  try {
    const res: Response = await fetch(`${BASE_URL}/todos/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: task.title,
        completed: task.completed,
        userId: task.userId,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    return res.json() as Promise<Task>;
  } catch (e) {
    console.log("Update task error: ", e);
    throw e;
  }
}

