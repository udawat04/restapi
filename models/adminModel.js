const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const adminModel = new Schema(
    {
        id:{type:Number},
        username:{type:String},
        password:{type:Number}
    },
    {
        timestamps:true
    }
);

const Admin=mongoose.model("admin",adminModel);
module.exports=Admin;

