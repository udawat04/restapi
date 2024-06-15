const mongoose = require("mongoose");
const { BASE_URL } = require("../config");
const Schema = mongoose.Schema;
const categorySchema=new Schema(
    {
        title:{type:String},
        description:{type:String},
        thumbnail:{type:String,
            get:(thumbnail)=>{
                return `${BASE_URL}${thumbnail}`;
            }
        }
    },
    {
        timestamps:true,
        toJSON:{getters:true},
    }
);

const Category = mongoose.model("Category" , categorySchema)
module.exports=Category;