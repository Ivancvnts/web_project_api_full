const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /https?:\/\/(www\.)?[\w-]+(\.[\w-]+)+(\/[\w.~:/?%#\[\]@!$&'()*+,;=]*)?/.test(
          v,
        );
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
