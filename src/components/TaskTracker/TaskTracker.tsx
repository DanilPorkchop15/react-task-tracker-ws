import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import TaskOptions from "../TaskOptions/TaskOptions";
import { CreateTaskType, ITask } from "../../types/Task.types";

interface ITaskProps {}

interface ITaskState {
  tasks: ITask[];
}

class TaskTracker extends Component<ITaskProps, ITaskState> {
  private async addTask(task: CreateTaskType): Promise<ITask> {
    const res: Response = await fetch(
      "https://jsonplaceholder.typicode.com/todos",
      {
        method: "POST",
        body: JSON.stringify({ title: "foo", completed: false, userId: 1 }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    return res.json() as Promise<ITask>;
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
        <TaskList tasks={[]} onDelete={() => {}} />
      </>
    );
  }
}

export default TaskTracker;
