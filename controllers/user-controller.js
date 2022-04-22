const { User } = require("../models");

const userController = {
  // used to get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "person",
        select: "-__v",
      })
      .select("-__v")
      .sort({ id: -1 })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //used to get user by ID
  getUserId({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "person",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) => {
        // If there is no user found
        if (!dbUser) {
          res.status(404).json({ message: "No user found w/this ID" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // used to add a new user
  addNewUser({ body }, res) {
    User.create(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(400).json(err));
  },

  // used to update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found w/this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // used to delete user
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No user found w/this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // used to add a new friend
  addNewFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // used to remove a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
