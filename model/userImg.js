const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    status:{
        type:Number,
        enum:[1,2,3],
        default:1
    },
    name:{
        type:String
    },
    imageURL:{
        type:String
    },
    cloudinary_Id:{
        type:String
    }
}, {collection:"user",timestamps:true})

const userModel = new mongoose.model("user",userSchema)
module.exports = userModel