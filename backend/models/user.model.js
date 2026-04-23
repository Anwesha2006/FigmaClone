const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: String,
  provider: {
    type: String,
    default: "google",
  },
},
{timestamps: true}
);
module.exports=mongoose.model("User",UserSchema)