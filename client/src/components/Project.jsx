import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Project(props) {
  const [project, setProject] = useState({});
  const url = `http://localhost:5000/api/projects/${props.match.params.id}`;

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setProject(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [url]);

  return (
    Object.keys(project).length && (
      <div>
        <h2>{project.name}</h2>
        <div>Description: {project.description}</div>
        <div>Completed: {project.completed ? "Yes" : "No"}</div>
        <h2>Actions:</h2>
        {project.actions.map(action => {
          return (
            <div>
              <div>{action.name}</div>
              <div>{action.description}</div>
              <div>{action.completed ? "Yes" : "No"}</div>
            </div>
          );
        })}
      </div>
    )
  );
}
