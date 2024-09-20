import React, { ChangeEvent, Component } from "react";
import { IUser } from "../../types/User.types";
import "./TaskUserSelect.css";
import { fetchUsers } from "../../services/User.service";

interface IUserSelectProps {
  onSelect: (userId: number) => void;
}

interface IUserSelectState {
  users: IUser[] | null;
}

class TaskUserSelect extends Component<IUserSelectProps, IUserSelectState> {
  constructor(props: IUserSelectProps) {
    super(props);
    this.state = {
      users: null,
    };
  }

  private handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    this.props.onSelect(+e.target.value);
  };

  componentDidMount(): void {
    fetchUsers()
      .then((users: IUser[]) => {
        this.setState({ users });
        this.props.onSelect(+users[0].id);
      })
      .catch((e: Error) => {
        console.log("User fetch error " + e);
      });
  }

  render(): React.ReactNode {
    return (
      <select
        name="selectUser"
        className="task-user-select"
        onChange={this.handleSelect}
      >
        {this.state.users &&
          this.state.users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.username}
            </option>
          ))}
      </select>
    );
  }
}

export default TaskUserSelect;
