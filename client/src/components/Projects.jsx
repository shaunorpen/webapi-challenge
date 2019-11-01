import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Projects(props) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects/")
      .then(res => {
        setProjects(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>Projects</h1>
      {projects.map(project => {
        return (
          <div>
            {project.name}
            <Link to={"/projects/" + project.id}>
              <button>Go</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
