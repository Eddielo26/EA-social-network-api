const { User, Thought } = require("../models");

const thoughtController = {
  // used to get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThought) => res.json(dbThought))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // used to get thought by ID
  getThoughtId({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThought) => {
        // if no thought is found
        if (!dbThought) {
          res.status(404).json({ message: "No thought found w/this ID" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
// used to add a new thought
  addNewThought({ params, body }, res) {
    Thought.create(body)
      .then((dbUser) => {
      //   return User.findOneAndUpdate(
      //     { _id: params.userId },
      //     { $push: { thoughts: _id } },
      //     { new: true }
      //   );
      // })
      // .then((dbUser) => {
      //   if (!dbUser) {
      //     res.status(404).json({ message: "No thought found w/this ID" });
      //     return;
      //   }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  // used to update thoughts by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found w/this ID" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // used to delete thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // used to add a Reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought w/this ID" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
  },

  // used to delete a Reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThought) => res.json(dbThought))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
