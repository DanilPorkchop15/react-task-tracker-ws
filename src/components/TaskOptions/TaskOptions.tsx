import React, { ChangeEvent, Component } from "react";
import "./TaskOptions.css";
import TaskUserSelect from "../TaskUserSelect/TaskUserSelect";

interface ITaskProps {
  onAdd: (value: string, userId: number) => void;
  onMarkEvent: (value: boolean) => void;
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

  private handleAdd = () => {
    if (this.state.value !== "" && this.state.userId) {
      this.props.onAdd(this.state.value, this.state.userId);
      this.setState({ ...this.state, value: "" });
    }
  };

  private handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    this.setState({ ...this.state, value: e.target.value });
  };
  private handleSelect: (userId: number) => void = (userId) => {
    this.setState({ ...this.state, userId });
  };

  render(): React.ReactNode {
    return (
      <div className="task-options fl-col fl-center">
        <div className="task-options-block fl a-center j-between">
          <input
            type="text"
            className="task-input-new input"
            placeholder="Enter new task..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <TaskUserSelect
            onSelect={this.handleSelect}
            className="task-options-user-select"
          />
          <button onClick={this.handleAdd} className="task-button-new button">
            Add task
          </button>
        </div>

        <div className="task-options-block fl a-center">
          <button
            className="task-options-mark-all button"
            onClick={() => this.props.onMarkEvent(true)}
          >
            Check all
          </button>
          <button
            className="task-options-unmark-all button"
            onClick={() => this.props.onMarkEvent(false)}
          >
            Uncheck all
          </button>
        </div>
      </div>
    );
  }
}

export default TaskOptions;
