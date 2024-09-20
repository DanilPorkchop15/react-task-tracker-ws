import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import TaskOptions from "../TaskOptions/TaskOptions";
import { CreateTaskType, ITask } from "../../types/Task.types";
import { BASE_URL } from "../../utils/constants";
import "./TaskTracker.css"

interface ITaskProps {}

interface ITaskState {
  tasks: ITask[];
}

class TaskTracker extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      tasks: [],
    };
  }
  componentDidMount(): void {
    this.refreshTasks();
  }
  private refreshTasks(): void {
    this.fetchTasks()
      .then((res: ITask[]) => {
        this.setState({ tasks: res }, () =>
          console.log("State +" + this.state.tasks)
        );
      })
      .catch((e: Error) => {
        alert("Ошибка получения задач!!!");
        console.log(e);
      });
  }
  private async fetchTasks(): Promise<ITask[]> {
    try {
      const res: Response = await fetch(`${BASE_URL}/todos`);
      return res.json() as Promise<ITask[]>;
    } catch (e) {
      console.log("Fetch error: ", e);
      throw e;
    }
  }
  private async addTask(task: CreateTaskType): Promise<ITask> {
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
  private handleAdd(title: string, userId: number) {
    const updatedTasks: ITask[] = this.state.tasks.slice();
    const newTask: CreateTaskType = {
      title,
      userId,
      completed: false,
    };
    this.addTask(newTask)
      .then((res: ITask) => {
        updatedTasks.push(res);
        this.setState({ tasks: updatedTasks });
      })
      .catch((e: Error) => {
        alert("Возникла ошибка при добавлении задачи!!!");
        console.log(e);
      });
  }
  render(): React.ReactNode {
    return (
      <>
        <h1>React Task Tracker</h1>
        <TaskOptions onAdd={this.handleAdd} />
        <TaskList tasks={this.state.tasks} onDelete={this.refreshTasks} />
      </>
    );
  }
}

export default TaskTracker;
