import React, { Component } from "react";
import { ITask } from "../../types/Task.types";
import "./Task.css";
import { fetchUser } from "../../services/User.service";
import { IUser } from "../../types/User.types";
import { updateTask } from "../../services/Task.service";

interface ITaskProps extends ITask {
  onDelete: (id: number) => void;
}

type ITaskState = {
  isToggled: boolean;
  username: string | null;
};

class Task extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      isToggled: this.props.completed,
      username: null,
    };
  }
  private handleToggle: () => void = () => {
    updateTask({
      id: this.props.id,
      title: this.props.title,
      completed: !this.state.isToggled,
      userId: this.props.userId,
    })
      .then(() => {
        this.setState({ isToggled: !this.state.isToggled });
      })
      .catch((e: Error) => {
        console.log("Task update error " + e);
      });
  };
  private handleDelete: () => void = () => {
    this.props.onDelete(this.props.id);
  };
  private handleEdit: () => void = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };
  componentDidMount(): void {
    fetchUser(this.props.userId)
      .then((user: IUser) => {
        this.setState({ username: user.username });
      })
      .catch((e: Error) => {
        console.log("User fetch error " + e);
      });
  }
  render(): React.ReactNode {
    return (
      <div className="task">
        <div className="task-block">
          <span>{this.props.id}</span>
          <p>{this.props.title}</p>
        </div>
        <div className="task-block">
          <div className="task-block">
            <span>{this.state.username? this.state.username : "loading..."}</span>
          </div>
          <div className="task-block">
            <input
              type="checkbox"
              name="completed"
              id="completed"
              checked={this.state.isToggled}
              onChange={this.handleToggle}
            />
            <div className="task-actions">
              <button className="task-edit">Edit</button>
              <button className="task-delete" onClick={this.handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
