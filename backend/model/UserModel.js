const mongoose = require("mongoose");

const UserSchema = {
  name: {
    type: String,
    min: 1,
    max: 50,
    require: true,
  },
  email: {
    type: String,
    validaye: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    }, bio: {
      type: String,
      min: 0,
      max: 200,
      require:true
  }
  
};
{ timestamps: true };
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;