const { User } = require("../models");

const userController = {
  // used to get all users
  getAllUsers(req, res) {
    User.find({})
    .populate({
      path: 'person',
      select: '-__v',
    })
    .select("-__v")
    .sort({id: -1})
    .then((dbUser) => res.json(dbUser))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //used to get user by ID
  getUserId({params}, res) {
    User.findOne({_id: params.id})
    .populate({
      path:'person',
      select:'-__v',
    })
    .select('-__v')
    .then((dbUser) => {
      // If there is no user found
      if(!dbUser) {
        res.status(404).json({message: 'No user found w/this ID'});
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  addNewUser,
  updateUser,
  removeUser,
  addNewFriend,
  removeFriend,
};

module.exports = userController;
