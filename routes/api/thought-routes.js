const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtId,
  addNewThought,
  updateThought,
  removeThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// used to GET all and POST
router.route("/")
    .get(getAllThoughts)
    .post(addNewThought);

// used to GET/PUT and DELETE thoughts
router.route("/:id")
    .get(getThoughtId)
    .put(updateThought)
    .delete(removeThought);

router.route("/:thoughtId/reactions")
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;