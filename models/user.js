import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:"string", required:true},
    email:{type:"string", required:true},
    password:{type:"string", required:false},
    googleID:{type:"string", required:false},
    id:{type:"string"}
});

export default mongoose.model("User", userSchema);