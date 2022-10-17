import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../../pages/Home";
import TaskListPage from "../../pages/TaskListPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskListPage />} />
      </Routes>
    </div>
  );
}

export default App;
