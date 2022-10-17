import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>Home page</div>
      <Link to="/tasks">Task List</Link>
    </>
  );
};

export default Home;
