let mongoose = require("mongoose");
let validator = require("validator");
let bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    require: [true, "username is a required field"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is a required field"],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: function (props) {
        return `${props.value} is not a valid Email`;
      },
    },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
    minlength: [6, "password must be at least 6 characters long"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "password is a required field"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "passwords do not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  let hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.passwordMatch = async function (rawPassword) {
  return await bcrypt.compare(rawPassword, this.password);
};

let User = mongoose.model("User", userSchema);

module.exports = User;
