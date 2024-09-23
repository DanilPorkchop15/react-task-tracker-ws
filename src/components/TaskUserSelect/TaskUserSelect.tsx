import React, { ChangeEvent, Component } from "react";
import { IUser } from "../../types/User.types";
import "./TaskUserSelect.css";
import { fetchUsers } from "../../services/User.service";

interface IUserSelectProps {
  onSelect: (userId: number) => void;
  defaultValue?: string | null;
  className?: string | null;
}

interface IUserSelectState {
  users: IUser[] | null;
  selectedUser: IUser | null;
}

class TaskUserSelect extends Component<IUserSelectProps, IUserSelectState> {
  constructor(props: IUserSelectProps) {
    super(props);
    this.state = {
      users: null,
      selectedUser: null,
    };
  }

  private handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    const selectedUser = this.state.users?.find(
      (user) => user.id === +e.target.value
    );
    this.setState({ selectedUser: selectedUser as IUser });
    this.props.onSelect(+e.target.value);
  };

  componentDidMount(): void {
    fetchUsers()
      .then((users: IUser[]) => {
        this.setState({ users });
        const defaultValue = this.props.defaultValue
          ? users?.find((user) => user.username === this.props.defaultValue)
          : this.state.users?.[0];
        if (defaultValue) {
          this.setState({ selectedUser: defaultValue });
          this.props.onSelect(defaultValue.id);
        }
      })
      .catch((e: Error) => {
        console.log("User fetch error " + e);
      });
  }

  render(): React.ReactNode {
    return (
      <select
        name="selectUser"
        className={`task-user-select ${this.props.className}`}
        onChange={this.handleSelect}
        value={this.state.selectedUser?.id ?? "loading"}
      >
        {this.state.users ? (
          this.state.users.map((user) => (
            <option value={user.id} key={user.id}>
              User: {user.username}
            </option>
          ))
        ) : (
          <option value="loading">loading...</option>
        )}
      </select>
    );
  }
}

export default TaskUserSelect;
