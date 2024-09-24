import { Component, createRef, FormEvent } from "react";
import TaskUserSelect from "../TaskUserSelect/TaskUserSelect";
import "./TaskEdit.css";

interface TaskEditProps {
  onEdit: (title: string, userId: number) => void;
  title: string;
  username: string | null;
}

interface TaskEditState {
  userId: number;
}

class TaskEdit extends Component<TaskEditProps, TaskEditState> {
  constructor(props: TaskEditProps) {
    super(props);
    this.state = {
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
    if (this.inputRef.current) {
      this.inputRef.current.value = this.props.title;
    }
  }

  private handleSelect: (userId: number) => void = (userId: number) => {
    this.setState({ ...this.state, userId });
  };
  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleEdit} className="task-form-edit fl-col">
        <label htmlFor="newTitle" className="task-label fl-col">
          New title
          <input
            ref={this.inputRef}
            type="text"
            className="task-input-edit"
            placeholder="Enter new task..."
            name="newTitle"
          />
        </label>
        <label className="task-label fl-col">
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

