import React, { Component } from "react";
import { ITask } from "../../types/Task.types";

interface ITaskProps extends ITask {
  onDelete: () => void
};

type ITaskState = {
  isToggled: boolean;
};

class Task extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      isToggled: this.props.completed
    };
  }
  render(): React.ReactNode {
    return (<div className="task">
      <span>{this.props.id}</span>
      <span>{this.props.title}</span>
      <input type="checkbox" name="completed" id="completed" checked={this.state.isToggled} />
    </div>);
  }
}

export default Task;
