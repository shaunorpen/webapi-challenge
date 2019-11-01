const express = require("express");
const actions = require("../../data/helpers/actionModel");

const router = express.Router();

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateNewAction, (req, res) => {
  actions
    .insert(req.action)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was an error adding the action to the database: " +
          error.message
      });
    });
});

router.put("/:id", validateUpdatedAction, (req, res) => {
  actions
    .update(req.params.id, req.action)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was a problem updating the action in the database: " +
          error.message
      });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  actions
    .remove(req.action.id)
    .then(data => {
      res.status(200).json({
        message: `${data} action${
          data === 1 ? " was" : "s were"
        } deleted from the database.`
      });
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was a problem deleting the action from the database: " +
          error.message
      });
    });
});

function validateActionId(req, res, next) {
  actions
    .get(req.params.id)
    .then(data => {
      if (data) {
        req.action = data;
        next();
      } else {
        res.status(404).json({
          message: "There is no action with that id."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error validating the action id: " + error.message
      });
    });
}

function validateNewAction(req, res, next) {
  const action = req.body;
  if (!action.project_id || !action.description || !action.notes) {
    res.status(400).json({
      message:
        "Please ensure the new action has a project_id, description  and notes."
    });
  } else {
    req.action = action;
    next();
  }
}

function validateUpdatedAction(req, res, next) {
  const action = req.body;
  if (
    !action.project_id &&
    !action.description &&
    !action.notes &&
    !action.completed
  ) {
    res.status(400).json({
      message:
        "Please ensure the updated action has either a new project_id, description, notes or completed status."
    });
  } else {
    req.action = action;
    next();
  }
}

module.exports = router;
