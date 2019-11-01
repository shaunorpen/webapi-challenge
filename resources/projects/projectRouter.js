const express = require("express");
const projects = require("../../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  projects
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was a problem retrieving the list of projects from the database: " +
          error.message
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateNewProject, (req, res) => {
  projects
    .insert(req.project)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was an error adding the project to the database: " +
          error.message
      });
    });
});

router.put("/:id", validateProjectId, validateUpdatedProject, (req, res) => {
  projects
    .update(req.params.id, req.project)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error updating the project: " + error.message
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  projects
    .remove(req.project.id)
    .then(data => {
      res.status(200).json({
        message: `${data} project${
          data === 1 ? " was" : "s were"
        } deleted from the database.`
      });
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was an error deleting the project from the database: " +
          error.message
      });
    });
});

function validateProjectId(req, res, next) {
  projects
    .get(req.params.id)
    .then(data => {
      if (data) {
        req.project = data;
        next();
      } else {
        res.status(404).json({
          message: "There is no project with that id."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was an error validating the project id: " + error.message
      });
    });
}

function validateNewProject(req, res, next) {
  const project = req.body;
  if (!project.name || !project.description) {
    res.status(400).json({
      message:
        "Please ensure the new project has both a name and a description."
    });
  } else {
    req.project = project;
    next();
  }
}

function validateUpdatedProject(req, res, next) {
  const project = req.body;
  if (!project.name && !project.description && !project.completed) {
    res.status(400).json({
      message:
        "Please ensure the updated project has either an updated name, description or completed status."
    });
  } else {
    req.project = project;
    next();
  }
}

module.exports = router;
