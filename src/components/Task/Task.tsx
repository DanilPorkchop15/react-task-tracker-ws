import React, { Component } from "react";
import { ITask } from "../../types/Task.types";
import "./Task.css";
import { fetchUser } from "../../services/User.service";
import { IUser } from "../../types/User.types";
import { updateTask } from "../../services/Task.service";
import TaskEdit from "../TaskEdit/TaskEdit";

interface ITaskProps extends ITask {
  onDelete: (id: number) => void;
}

type ITaskState = {
  isToggled: boolean;
  doEdit: boolean;
  username: string | null;
  title: string;
};

class Task extends Component<ITaskProps, ITaskState> {
  constructor(props: ITaskProps) {
    super(props);
    this.state = {
      isToggled: this.props.completed,
      doEdit: false,
      username: null,
      title: this.props.title,
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
  private handleEdit: (title: string, username: number) => void = (
    title,
    userId
  ) => {
    fetchUser(userId)
      .then(({ username }) => {
        updateTask({
          id: this.props.id,
          title,
          completed: this.state.isToggled,
          userId,
        });
        this.setState({
          ...this.state,
          doEdit: !this.state.doEdit,
          title,
          username,
        });
      })
      .catch((e: Error) => {
        console.log("Task edit error " + e);
      });
  };

  private toggleEdit = () => {
    this.setState({ doEdit: !this.state.doEdit });
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
      <div className="task fl-col j-between">

        <div className="task-section fl a-baseline j-between">

          <div className="task-block fl a-baseline">
            <span>{this.props.id}</span>
            <p>{this.state.title}</p>
          </div>

          <div className="task-block fl a-baseline">

            <div className="task-block fl a-baseline">
              <span>
                {this.state.username ? this.state.username : "loading..."}
              </span>
            </div>

            <div className="task-block fl a-baseline">
              <input
                type="checkbox"
                name="completed"
                id="completed"
                checked={this.state.isToggled}
                onChange={this.handleToggle}
              />
              <div className="task-actions fl">
                <button
                  className="task-edit button"
                  onClick={this.toggleEdit}
                  disabled={this.state.username === null}
                >
                  {this.state.doEdit ? "Cancel" : "Edit"}
                </button>
                <button className="task-delete button" onClick={this.handleDelete}>
                  Delete
                </button>
              </div>
            </div>

          </div>

        </div>

        <div className="task-section fl a-baseline j-between">
          {this.state.doEdit && (
            <TaskEdit onEdit={this.handleEdit} title={this.props.title}  username={this.state.username}/>
          )}
        </div>

      </div>
    );
  }
}

export default Task;
