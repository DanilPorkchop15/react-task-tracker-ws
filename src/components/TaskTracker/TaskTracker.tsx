import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import TaskOptions from "../TaskOptions/TaskOptions";
import { CreateTaskType, ITask } from "../../types/Task.types";
import "./TaskTracker.css";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../../services/Task.service";
import Loader from "../Loader/Loader";

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

  private handleAdd: (title: string, userId: number) => void = (
    title,
    userId
  ) => {
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
        console.log("Add task error " + e);
      });
  };

  private handleMarkAll: () => void = () => {
    const doMarkAll = window.confirm(
      "Вы уверены, что хотите отметить все задачи как выполненные?"
    );

    if (doMarkAll) {
      try {
        const updatedTasks: ITask[] = this.state.tasks.map((task) => ({
          ...task,
          completed: true,
        }));

        this.setState({ tasks: updatedTasks }, () => {
          updatedTasks.forEach((task) => {
            updateTask(task)
              .then(() => console.log(`Task ${task.id} updated`))
              .catch((e: Error) => {
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
    const updatedTasks: ITask[] = this.state.tasks.slice();
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
    const updatedTasks: ITask[] = this.state.tasks.slice();
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
        <TaskOptions onAdd={this.handleAdd} onMarkAll={this.handleMarkAll} />
        <h2>Task list</h2>
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
