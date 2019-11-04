import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Project from "./components/Project";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Projects} />
      <Route exact path="/projects/:id" component={Project} />
    </div>
  );
}

export default App;
