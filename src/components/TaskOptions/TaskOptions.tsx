import React, { ChangeEvent, Component } from "react";
import { ITask } from "../../types/Task.types";
import { IUser } from "../../types/User.types";

interface ITaskProps {
  onAdd: (value: string, userId: number) => void;
}

interface ITaskState {
  value: string;
  user: IUser
}

class TaskOptions extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      value: '',
      user: {} as IUser
    }
  }

  private handleAdd() {
    if (this.state.value !== "") {
      this.props.onAdd(this.state.value, this.state.user.id)
      this.setState({...this.state, value: ''});
    }
  }
  private handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({...this.state, value: e.target.value });
  }
  render(): React.ReactNode {
    return (
      <div className="task-options">
        <input type="text" />
        <button onClick={this.handleAdd}>Add new task</button>
      </div>
    );
  }
}

export default TaskOptions;
