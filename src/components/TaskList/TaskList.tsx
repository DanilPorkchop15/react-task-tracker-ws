import React, { Component } from "react";
import { ITask } from "../../types/Task.types";
import Task from "../Task/Task";
import "./TaskList.css";

interface ITaskProps {
  tasks: ITask[];
  onDelete: () => void;
}

interface ITaskState {}

class TaskList extends Component<ITaskProps, ITaskState> {
  private handleDelete() {
    this.props.onDelete();
  }
  render(): React.ReactNode {
    const { tasks } = this.props;
    return (
      <div className="task-list">
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              userId={task.userId}
              completed={task.completed}
              onDelete={this.handleDelete}
            />
          ))}
      </div>
    );
  }
}

export default TaskList;
