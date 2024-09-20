import React, { Component } from "react";
import TaskList from "../TaskList/TaskList";
import TaskOptions from "../TaskOptions/TaskOptions";

interface TaskTrackerProps {}

interface TaskTrackerState {}

class TaskTracker extends Component<TaskTrackerProps, TaskTrackerState> {
  render(): React.ReactNode {
    return (
      <>
        <h1>React Task Tracker</h1>
        <TaskOptions />
        <TaskList />
      </>
    );
  }
}

export default TaskTracker;
