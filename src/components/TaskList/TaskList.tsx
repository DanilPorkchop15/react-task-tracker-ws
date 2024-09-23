import React, { Component } from "react";
import { ITask } from "../../types/Task.types";
import Task from "../Task/Task";
import "./TaskList.css";

interface ITaskListProps {
  tasks: ITask[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

interface ITaskListState {}

class TaskList extends Component<ITaskListProps, ITaskListState> {
  private handleDelete: (id: number) => void = (id) => {
    this.props.onDelete(id);
  };

  private handleToggle: (id: number) => void = (id) => {
    this.props.onToggle(id);
  };
  render(): React.ReactNode {
    const { tasks } = this.props;
    return (
      <div className="task-list fl-col">
        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              userId={task.userId}
              completed={task.completed}
              onDelete={this.handleDelete}
              onToggle={this.handleToggle}
            />
          ))}
      </div>
    );
  }
}

export default TaskList;
