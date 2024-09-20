import React, { Component } from "react";
import { ITask } from "../../types/Task.types";
import "./Task.css";

interface ITaskProps extends ITask {
  onDelete: () => void;
}

type ITaskState = {
  isToggled: boolean;
};

class Task extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      isToggled: this.props.completed,
    };
  }
  render(): React.ReactNode {
    return (
      <div className="task">
        <div className="task-block">
          <span>{this.props.id}</span>
          <p>{this.props.title}</p>
        </div>
        <div className="task-block">
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={this.state.isToggled}
          />
          <div className="task-actions">
            <button className="task-edit">Edit</button>
            <button className="task-delete">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
