import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import TaskOptions from "../TaskOptions/TaskOptions";
import { CreateTaskType, ITask } from "../../types/Task.types";
import "./TaskTracker.css";
import { addTask, fetchTasks } from "../../services/Task.service";

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
    fetchTasks()
      .then((res: ITask[]) => {
        this.setState({ tasks: res });
      })
      .catch((e: Error) => {
        alert("Ошибка получения задач!!!");
        console.log(e);
      });
  }

  private handleAdd: (title: string, userId: number) => void = (title, userId) => {
    const updatedTasks: ITask[] = this.state.tasks.slice();
    const newTask: CreateTaskType = {
      title,
      userId,
      completed: false,
    };
    addTask(newTask)
      .then((res: ITask) => {
        updatedTasks.unshift(res);
        this.setState({ tasks: updatedTasks });
      })
      .catch((e: Error) => {
        alert("Возникла ошибка при добавлении задачи!!!");
        console.log(e);
      });
  };
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
