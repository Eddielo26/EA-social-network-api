const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts,
  getThoughtId,
  addNewThought,
  updateThought,
  removeThought,
};

module.exports = thoughtController;
