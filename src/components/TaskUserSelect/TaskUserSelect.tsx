import React, { ChangeEvent, Component } from "react";
import { IUser } from "../../types/User.types";
import { BASE_URL } from "../../utils/constants";
import "./TaskUserSelect.css";

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

  private async fetchUsers(): Promise<IUser[]> {
    try {
      const res: Response = await fetch(`${BASE_URL}/users`);
      if (res.ok) {
        return res.json();
      } else {
        console.log("User fetch error", res.status, res.statusText);
        throw new Error(
          `Failed to fetch users: ${res.status} ${res.statusText}`
        );
      }
    } catch (e) {
      console.log("User fetch error", e);
      throw e;
    }
  }

  private handleSelect: (e: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    this.props.onSelect(+e.target.value);
  };

  componentDidMount(): void {
    this.fetchUsers()
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
