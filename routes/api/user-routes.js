const router = require("express").Router();

const {
  getAllUsers,
  getUserId,
  addNewUser,
  updateUser,
  removeUser,
  addNewFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// used to GET/POST localhost:3001/api/users
router.route("/")
    .get(getAllUsers)
    .post(addNewUser);

// used to GET/PUT and DELETE localhost:3001/api/users/:id
router.route("/:id")
    .get(getUserId)
    .put(updateUser)
    .delete(removeUser);

// used to add/delete a friend
router.route("/:id/friends/:friendsId")
    .post(addNewFriend)
    .delete(removeFriend);

module.exports = router;