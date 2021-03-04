let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let googleUserSchema = new Schema({
  googleId: {
    type: String,
    required: [true, "google id is required"],
  },
  username: String,
});

let GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

module.exports = GoogleUser;
