import React, { ChangeEvent, Component } from "react";
import { IUser } from "../../types/User.types";
import "./TaskOptions.css"

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
        <input type="text" className="task-input-new" placeholder="Enter new task..."/>
        <button onClick={this.handleAdd} className="task-button-new">Add task</button>
      </div>
    );
  }
}

export default TaskOptions;
