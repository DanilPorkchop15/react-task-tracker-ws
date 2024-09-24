import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import TaskOptions from "../TaskOptions/TaskOptions";
import { CreateTask, Task } from "../../types/Task.types";
import "./TaskTracker.css";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../services/Task.service";
import Loader from "../Loader/Loader";

interface TaskProps {}

interface TaskState {
  tasks: Task[];
}

class TaskTracker extends Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
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
      .then((res: Task[]) => {
        this.setState({ tasks: res });
      })
      .catch((e: Error) => {
        alert("Ошибка получения задач!!!");
        console.log(e);
      });
  }

  private handleAdd: (title: string, userId: number) => void = (
    title,
    userId
  ) => {
    const updatedTasks: Task[] = this.state.tasks.slice();
    const newTask: CreateTask = {
      title,
      userId,
      completed: false,
    };
    addTask(newTask)
      .then((res: Task) => {
        updatedTasks.unshift(res);
        this.setState({ tasks: updatedTasks });
      })
      .catch((e: Error) => {
        console.log("Add task error " + e);
      });
  };

  private handleMarkAll: (value: boolean) => void = (value) => {
    const doMarkAll = window.confirm(
      `Вы уверены, что хотите отметить все задачи как ${
        value ? "" : "не"
      } выполненные?`
    );

    if (doMarkAll) {
      try {
        const updatedTasks: Task[] = this.state.tasks.map((task) => ({
          ...task,
          completed: value,
        }));

        this.setState({ tasks: updatedTasks }, () => {
          updatedTasks.forEach((task) => {
            updateTask(task).catch((e: Error) => {
              console.error(`Error updating task ${task.id}:`, e);
            });
          });
        });
      } catch (e) {
        console.log("Mark all error " + e);
      }
    }
  };

  private handleDelete: (id: number) => void = (id) => {
    const updatedTasks: Task[] = this.state.tasks.slice();
    const doDelete = window.confirm("Вы уверены, что хотите удалить задачу?");
    doDelete &&
      deleteTask(id)
        .then(() => {
          updatedTasks.splice(
            updatedTasks.findIndex((task) => task.id === id),
            1
          );

          this.setState({ tasks: updatedTasks });
        })
        .catch((e: Error) => {
          alert("Возникла ошибка при удалении задачи!!!");
          console.log(e);
        });
  };

  private handleToggle: (id: number) => void = (id) => {
    const updatedTasks: Task[] = this.state.tasks.slice();
    const task = updatedTasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      updateTask(task)
        .then(() => {
          this.setState({ tasks: updatedTasks });
        })
        .catch((e: Error) => {
          console.error(`Error updating task ${task.id}:`, e);
        });
    } else {
      console.error(`Task with id ${id} not found`);
    }
  };
  render(): React.ReactNode {
    return (
      <div className="task-tracker fl-col a-center">
        <h1 className="task-tracker-title">Task Tracker</h1>
        <h2 className="task-tracker-title">Options</h2>
        <TaskOptions onAdd={this.handleAdd} onMarkEvent={this.handleMarkAll} />
        <h2 className="task-tracker-title">Tasks</h2>
        {this.state.tasks && this.state.tasks.length > 0 ? (
          <TaskList
            tasks={this.state.tasks}
            onDelete={this.handleDelete}
            onToggle={this.handleToggle}
          />
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default TaskTracker;

