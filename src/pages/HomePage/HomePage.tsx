import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Home page</h1>
      <Link to="/tasks">Task List</Link>
    </>
  );
};

export default HomePage;
