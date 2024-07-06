const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerModel = new Schema(
  {
   
    fullname: { type: String },
    email: { type: String },
    mobile: { type: Number },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const Reg = mongoose.model("register", registerModel);
module.exports = Reg;
