import React, { ChangeEvent, Component } from "react";
import "./TaskOptions.css";
import TaskUserSelect from "../TaskUserSelect/TaskUserSelect";

interface ITaskProps {
  onAdd: (value: string, userId: number) => void;
}

interface ITaskState {
  value: string;
  userId: number | null;
}

class TaskOptions extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      value: "",
      userId: null,
    };
  }

  private handleAdd =() => {
    if (this.state.value !== "" && this.state.userId) {
      this.props.onAdd(this.state.value, this.state.userId);
      this.setState({ ...this.state, value: "" });
    }
  }

  private handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    this.setState({ ...this.state, value: e.target.value });
  }
  private handleSelect: (userId: number) => void = (userId) => {
    this.setState({ ...this.state, userId });
  }
  render(): React.ReactNode {
    return (
      <div className="task-options">
        <input
          type="text"
          className="task-input-new"
          placeholder="Enter new task..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <TaskUserSelect onSelect={this.handleSelect} />
        <button onClick={this.handleAdd} className="task-button-new">
          Add task
        </button>
      </div>
    );
  }
}

export default TaskOptions;
