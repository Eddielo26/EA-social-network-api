const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtual: true,
      //   getters: true,
    },
    id: false,
  }
);

// virtaul used to retrieve the length of the users friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// use userSchema to create user model
const User = model("User", userSchema);

// export model
module.exports = User;
