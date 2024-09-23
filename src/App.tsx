import React, { Component } from "react";
import "./App.css";
import TaskTracker from "./components/TaskTracker/TaskTracker";

class App extends Component {
  render() {
    return (
      <div className="App fl-col fl-center">
        <TaskTracker />
      </div>
    );
  }
}

export default App;
