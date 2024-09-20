import React, { Component } from "react";
import { ITask } from "../../types/Task.types";
import Task from "../Task/Task";
import "./TaskList.css";

interface ITaskListProps {
  tasks: ITask[];
  onDelete: (id: number) => void;
}

interface ITaskListState {}

class TaskList extends Component<ITaskListProps, ITaskListState> {
  private handleDelete: (id: number) => void = (id) => {
    this.props.onDelete(id);
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
