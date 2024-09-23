import { Component, createRef, FormEvent } from "react";
import TaskUserSelect from "../TaskUserSelect/TaskUserSelect";
import "./TaskEdit.css";

interface ITaskEditProps {
  onEdit: (title: string, userId: number) => void;
  title: string;
  username: string | null;
}

interface ITaskEditState {
  title: string;
  userId: number;
}

class TaskEdit extends Component<ITaskEditProps, ITaskEditState> {
  constructor(props: ITaskEditProps) {
    super(props);
    this.state = {
      title: props.title,
      userId: 0,
    };
  }
  private inputRef = createRef<HTMLInputElement>();

  private handleEdit: (e: FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    const title = this.inputRef.current!.value;
    this.props.onEdit(title, this.state.userId);
  };
  componentDidMount(): void {
    this.inputRef.current!.value = this.props.title;
  }

  private handleSelect: (userId: number) => void = (userId: number) => {
    this.setState({ ...this.state, userId });
  };
  render() {
    return (
      <form onSubmit={this.handleEdit} className="task-form-edit">
        <label htmlFor="newTitle" className="task-label">
          New title
          <input
            ref={this.inputRef}
            type="text"
            className="task-input-edit"
            placeholder="Enter new task..."
            name="newTitle"
          />
        </label>
        <label className="task-label">
          Author
          <TaskUserSelect
            onSelect={this.handleSelect}
            defaultValue={this.props.username}
            className="task-edit-user-select"
          />
        </label>
        <button type="submit" className="task-button-edit">
          Edit
        </button>
      </form>
    );
  }
}

export default TaskEdit;
