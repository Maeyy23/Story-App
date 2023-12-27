const Mongoose = require("mongoose");
const userSchema = Mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("Users", userSchema);
